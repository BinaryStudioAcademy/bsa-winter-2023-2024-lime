import swaggerJsdoc from 'swagger-jsdoc';

import { type Config } from '~/common/config/config.js';
import { AppEnvironment } from '~/common/enums/enums.js';

import {
    type ServerAppApi,
    type ServerAppRouteParameters,
} from './types/types.js';

class BaseServerAppApi implements ServerAppApi {
    public version: string;

    public routes: ServerAppRouteParameters[];

    private config: Config;

    public constructor(
        version: string,
        config: Config,
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
        const isLocal =
            this.config.ENV.APP.ENVIRONMENT === AppEnvironment.LOCAL;

        const controllerExtension = isLocal ? 'ts' : 'js';

        return swaggerJsdoc({
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Hello World',
                    version: `${this.version}.0.0`,
                },
            },
            apis: [`*/bundles/**/*.controller.${controllerExtension}`],
        });
    }
}

export { BaseServerAppApi };
