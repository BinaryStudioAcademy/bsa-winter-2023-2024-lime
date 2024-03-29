import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import fastifyStatic from '@fastify/static';
import swagger, { type StaticDocumentSpec } from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import Fastify, { type FastifyError } from 'fastify';
import multer from 'fastify-multer';
import fastifyRawBody from 'fastify-raw-body';
import { SubscriptionsApiPath } from 'shared';

import { type Config } from '~/common/config/config.js';
import { type Database } from '~/common/database/database.js';
import { ApiPath, ServerErrorType } from '~/common/enums/enums.js';
import { type ValidationError } from '~/common/exceptions/exceptions.js';
import { createProtectedRoutes } from '~/common/helpers/create-protected-routes-helper.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';
import {
    authPlugin,
    socketInjectorPlugin,
    verifyStripeWebhook,
} from '~/common/plugins/plugins.js';
import {
    jwtService,
    socketService,
    stripeService,
} from '~/common/services/services.js';
import {
    type ServerCommonErrorResponse,
    type ServerValidationErrorResponse,
    type ValidationSchema,
} from '~/common/types/types.js';
import { initStravaWebhook } from '~/common/webhooks/webhooks.js';

import {
    type ServerApp,
    type ServerAppApi,
    type ServerAppRouteParameters,
} from './types/types.js';

type Constructor = {
    config: Config;
    logger: Logger;
    database: Database;
    apis: ServerAppApi[];
};

class BaseServerApp implements ServerApp {
    private config: Config;

    private logger: Logger;

    private database: Database;

    private apis: ServerAppApi[];

    private app: ReturnType<typeof Fastify>;

    public constructor({ config, logger, database, apis }: Constructor) {
        this.config = config;
        this.logger = logger;
        this.database = database;
        this.apis = apis;

        this.app = Fastify();
        socketService.initializeIo(this.app.server);
    }

    public addRoute(parameters: ServerAppRouteParameters): void {
        const { path, method, handler, preHandler, validation } = parameters;

        this.app.route({
            url: path,
            method,
            handler,
            schema: {
                body: validation?.body,
                querystring: validation?.query,
                params: validation?.params,
            },
            preHandler: preHandler ?? [],
        });

        this.logger.info(`Route: ${method as string} ${path} is registered`);
    }

    private async initServe(): Promise<void> {
        const staticPath = join(
            dirname(fileURLToPath(import.meta.url)),
            '../../../public',
        );

        await this.app.register(fastifyStatic, {
            root: join(
                dirname(fileURLToPath(import.meta.url)),
                '../../../../build/backend/public/storybook',
            ),
            prefix: '/storybook/',
            decorateReply: false,
        });

        await this.app.register(fastifyStatic, {
            root: staticPath,
            prefix: '/',
        });

        this.app.setNotFoundHandler(async (_request, response) => {
            await response.sendFile('index.html', staticPath);
        });
    }

    public addRoutes(parameters: ServerAppRouteParameters[]): void {
        for (const it of parameters) {
            this.addRoute(it);
        }
    }

    public initRoutes(): void {
        const routers = this.apis.flatMap((it) => it.routes);

        this.addRoutes(routers);
    }

    public async initMiddlewares(): Promise<void> {
        await Promise.all(
            this.apis.map(async (it) => {
                this.logger.info(
                    `Generate swagger documentation for API ${it.version}`,
                );

                await this.app.register(swagger, {
                    mode: 'static',
                    specification: {
                        document:
                            it.generateDoc() as StaticDocumentSpec['document'],
                    },
                });

                await this.app.register(swaggerUi, {
                    routePrefix: `${it.version}/documentation`,
                });
            }),
        );
    }

    private async initPlugins(): Promise<void> {
        await this.app.register(authPlugin, {
            jwtService,
            protectedRoutes: createProtectedRoutes(this.apis),
        });

        await this.app.register(verifyStripeWebhook, {
            stripeService,
        });

        await this.app.register(fastifyRawBody, {
            field: 'rawBody',
            encoding: 'utf8',
            runFirst: true,
            routes: this.apis.map((it) => {
                return it.buildFullPath(
                    `${ApiPath.SUBSCRIPTIONS}${SubscriptionsApiPath.STRIPE_WEBHOOK}`,
                );
            }),
        });

        await this.app.register(multer.contentParser);
        await this.app.register(socketInjectorPlugin, { io: socketService.io });
    }

    private initValidationCompiler(): void {
        this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
            return <T, R = ReturnType<ValidationSchema['parse']>>(
                data: T,
            ): R => {
                const result = schema.parse(data);
                return {
                    value: result,
                } as R;
            };
        });
    }

    private async initWebhooks(): Promise<void> {
        await initStravaWebhook();
    }

    private initErrorHandler(): void {
        this.app.setErrorHandler(
            (error: FastifyError | ValidationError, _request, replay) => {
                if ('issues' in error) {
                    this.logger.error(`[Validation Error]: ${error.message}`);

                    for (const issue of error.issues) {
                        this.logger.error(
                            `[${issue.path.toString()}] — ${issue.message}`,
                        );
                    }

                    const response: ServerValidationErrorResponse = {
                        details: error.issues.map((issue) => ({
                            message: issue.message,
                            path: issue.path,
                        })),
                        errorType: ServerErrorType.VALIDATION,
                        message: error.message,
                    };

                    return replay
                        .status(HttpCode.UNPROCESSED_ENTITY)
                        .send(response);
                }

                if (error instanceof HttpError) {
                    this.logger.error(
                        `[Http Error]: ${error.status.toString()} – ${
                            error.message
                        }`,
                    );

                    const response: ServerCommonErrorResponse = {
                        errorType: ServerErrorType.COMMON,
                        message: error.message,
                    };

                    return replay.status(error.status).send(response);
                }

                this.logger.error(error.message);

                const response: ServerCommonErrorResponse = {
                    errorType: ServerErrorType.COMMON,
                    message: error.message,
                };

                return replay
                    .status(HttpCode.INTERNAL_SERVER_ERROR)
                    .send(response);
            },
        );
    }

    public async init(): Promise<void> {
        this.logger.info('Application initialization…');

        await this.initServe();

        await this.initMiddlewares();

        await this.initPlugins();

        this.initValidationCompiler();

        this.initErrorHandler();

        this.initRoutes();

        this.database.connect();

        await this.app
            .listen({
                port: this.config.ENV.APP.PORT,
                host: this.config.ENV.APP.HOST,
            })
            .catch((error: Error) => {
                this.logger.error(error.message, {
                    cause: error.cause,
                    stack: error.stack,
                });
            });

        await this.initWebhooks();

        this.logger.info(
            `Application is listening on PORT – ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT – ${
                this.config.ENV.APP.ENVIRONMENT as string
            }.`,
        );
    }
}

export { BaseServerApp };
