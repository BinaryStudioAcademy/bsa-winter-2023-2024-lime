import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { type Config, type EnvironmentSchema } from './types/types.js';

class BaseConfig implements Config {
    private logger: Logger;

    public ENV: EnvironmentSchema;

    public constructor(logger: Logger) {
        this.logger = logger;

        config();

        this.envSchema.load({});
        this.envSchema.validate({
            allowed: 'strict',
            output: (message) => this.logger.info(message),
        });

        this.ENV = this.envSchema.getProperties();
        this.logger.info('.env file found and successfully parsed!');
    }

    private get envSchema(): TConfig<EnvironmentSchema> {
        return convict<EnvironmentSchema>({
            APP: {
                ENVIRONMENT: {
                    doc: 'Application environment',
                    format: Object.values(AppEnvironment),
                    env: 'NODE_ENV',
                    default: null,
                },
                PORT: {
                    doc: 'Port for incoming connections',
                    format: Number,
                    env: 'PORT',
                    default: null,
                },
                HOST: {
                    doc: 'Host for server app',
                    format: String,
                    env: 'HOST',
                    default: null,
                },
                JWT_SECRET: {
                    doc: 'Jwt secret for token manipulation',
                    format: String,
                    env: 'JWT_SECRET',
                    default: null,
                },
                TOKEN_EXPIRATION_TIME: {
                    doc: 'Token expiration time',
                    format: String,
                    env: 'TOKEN_EXPIRATION_TIME',
                    default: null,
                },
                OPEN_AI_API_KEY: {
                    doc: 'Api key for working with AI',
                    format: String,
                    env: 'OPEN_AI_API_KEY',
                    default: null,
                },
                OPEN_AI_MODEL: {
                    doc: 'AI model',
                    format: String,
                    env: 'OPEN_AI_MODEL',
                    default: null,
                },
            },
            AWS: {
                S3_ACCESS_KEY: {
                    doc: 'Access key for aws connection',
                    format: String,
                    env: 'S3_ACCESS_KEY',
                    default: null,
                },
                S3_SECRET_KEY: {
                    doc: 'Secret key for aws connection',
                    format: String,
                    env: 'S3_SECRET_KEY',
                    default: null,
                },
                S3_BUCKET_NAME: {
                    doc: 'Bucket name for aws connection',
                    format: String,
                    env: 'S3_BUCKET_NAME',
                    default: null,
                },
                S3_REGION: {
                    doc: 'Region for aws connection',
                    format: String,
                    env: 'S3_REGION',
                    default: null,
                },
            },
            DB: {
                USERNAME: {
                    doc: 'Database connection username',
                    format: String,
                    env: 'DB_USERNAME',
                    default: null,
                },
                PASSWORD: {
                    doc: 'Database connection password',
                    format: String,
                    env: 'DB_PASSWORD',
                    default: null,
                },
                HOST: {
                    doc: 'Database connection host',
                    format: String,
                    env: 'DB_HOST',
                    default: null,
                },
                PORT: {
                    doc: 'Database connection port',
                    format: Number,
                    env: 'DB_PORT',
                    default: null,
                },
                NAME: {
                    doc: 'Database name to connect',
                    format: String,
                    env: 'DB_NAME',
                    default: null,
                },
                DIALECT: {
                    doc: 'Database dialect',
                    format: String,
                    env: 'DB_DIALECT',
                    default: null,
                },
                POOL_MIN: {
                    doc: 'Database pool min count',
                    format: Number,
                    env: 'DB_POOL_MIN',
                    default: null,
                },
                POOL_MAX: {
                    doc: 'Database pool max count',
                    format: Number,
                    env: 'DB_POOL_MAX',
                    default: null,
                },
            },
            EMAIL: {
                API_KEY: {
                    doc: 'SendGrid api key',
                    format: String,
                    env: 'EMAIL_API_KEY',
                    default: null,
                },
                FROM: {
                    doc: 'Email address to send mails to customers',
                    format: String,
                    env: 'EMAIL_FROM',
                    default: null,
                },
            },
            STRIPE: {
                SECRET_KEY: {
                    doc: 'Stripe secret key',
                    format: String,
                    env: 'STRIPE_SECRET_KEY',
                    default: null,
                },
                WEBHOOK_SECRET: {
                    doc: 'Stripe webhook secret key',
                    format: String,
                    env: 'STRIPE_WEBHOOK_SECRET',
                    default: null,
                },
            },
            STRAVA: {
                CLIENT_ID: {
                    doc: 'Strava Client ID',
                    format: String,
                    env: 'STRAVA_CLIENT_ID',
                    default: null,
                },
                CLIENT_SECRET: {
                    doc: 'Strava Client Secret',
                    format: String,
                    env: 'STRAVA_CLIENT_SECRET',
                    default: null,
                },
            },
        });
    }
}

export { BaseConfig };
