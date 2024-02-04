import swaggerJsdoc from 'swagger-jsdoc';

import { type IConfig } from '~/common/config/config.js';
import { AppEnvironment } from '~/common/enums/enums.js';

import { type IServerAppApi } from './interfaces/interfaces.js';
import { type ServerAppRouteParameters } from './types/types.js';

class ServerAppApi implements IServerAppApi {
    public version: string;

    public routes: ServerAppRouteParameters[];

    private config: IConfig;

    public constructor(
        version: string,
        config: IConfig,
        ...handlers: ServerAppRouteParameters[]
    ) {
        this.version = version;
        this.config = config;
        this.routes = handlers.map((it) => ({
            ...it,
            path: `/api/${this.version}${it.path}`,
        }));
    }

    public generateDoc(): ReturnType<typeof swaggerJsdoc> {
        const isProduction =
            this.config.ENV.APP.ENVIRONMENT === AppEnvironment.PRODUCTION;

        const controllerExtension = isProduction ? 'js' : 'ts';

        return swaggerJsdoc({
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Hello World',
                    version: `${this.version}.0.0`,
                },
            },
            apis: [`src/packages/**/*.controller.${controllerExtension}`],
        });
    }
}

export { ServerAppApi };
