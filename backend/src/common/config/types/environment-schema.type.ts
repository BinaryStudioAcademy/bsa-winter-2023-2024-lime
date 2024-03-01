import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
        HOST: string;
        JWT_SECRET: string;
        OPEN_AI_API_KEY: string;
        OPEN_AI_MODEL: string;
        TOKEN_EXPIRATION_TIME: string;
        BASE_URL: string;
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
    STRIPE: {
        SECRET_KEY: string;
        WEBHOOK_SECRET: string;
    };
    STRAVA: {
        CLIENT_ID: string;
        CLIENT_SECRET: string;
    };
    GOOGLE_FIT: {
        CLIENT_ID: string;
        CLIENT_SECRET: string;
    };
};

export { type EnvironmentSchema };
