import { type AppEnvironment } from '~/common/enums/enums.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: AppEnvironment;
        JWT_SECRET: string
    };
    DB: {
        CONNECTION_STRING: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
};

export { type EnvironmentSchema };
