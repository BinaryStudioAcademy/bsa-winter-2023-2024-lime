import { type Config, type EnvironmentSchema } from './types/types.js';

class BaseConfig implements Config {
    public ENV: EnvironmentSchema;

    public constructor() {
        this.ENV = this.envSchema;
    }

    private get envSchema(): EnvironmentSchema {
        return {
            APP: {
                ENVIRONMENT: import.meta.env['VITE_APP_NODE_ENV'],
            },
            API: {
                ORIGIN_URL: import.meta.env[
                    'VITE_APP_API_ORIGIN_URL'
                ] as string,
            },
            STRIPE: {
                PUBLIC_KEY: import.meta.env[
                    'VITE_APP_STRIPE_PUBLIC_KEY'
                ] as string,
            },
        };
    }
}

export { BaseConfig };
