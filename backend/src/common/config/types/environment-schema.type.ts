import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
        HOST: string;
        JWT_SECRET: string;
    };
    AWS: {
        S3_ACCESS_KEY: string;
        S3_SECRET_KEY: string;
        S3_BUCKET_NAME: string;
        S3_REGION: string;
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
    EMAIL: {
        API_KEY: string;
        FROM: string;
    };
};

export { type EnvironmentSchema };
