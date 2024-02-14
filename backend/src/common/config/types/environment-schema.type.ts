import { type AppEnvironment } from '~/common/enums/enums.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: AppEnvironment;
        HOST: string;
        JWT_SECRET: string;
    };
    DB: {
        USERNAME: string;
        PASSWORD: string;
        HOST: string;
        PORT: number;
        NAME: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
};

export { type EnvironmentSchema };
