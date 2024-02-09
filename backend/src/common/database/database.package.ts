import Knex, { type Knex as TKnex } from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

import { type IConfig } from '~/common/config/config.js';
import { AppEnvironment } from '~/common/enums/enums.js';
import { type ILogger } from '~/common/logger/logger.js';

import { DatabaseTableName } from './enums/enums.js';
import { type IDatabase } from './interfaces/interfaces.js';

class Database implements IDatabase {
    private appConfig: IConfig;

    private logger: ILogger;

    public constructor(config: IConfig, logger: ILogger) {
        this.appConfig = config;
        this.logger = logger;
    }

    public connect(): ReturnType<IDatabase['connect']> {
        this.logger.info('Establish DB connection...');

        Model.knex(Knex(this.environmentConfig));
    }

    public get environmentsConfig(): IDatabase['environmentsConfig'] {
        return {
            [AppEnvironment.DEVELOPMENT]: this.initialConfig,
            [AppEnvironment.PRODUCTION]: this.initialConfig,
        };
    }

    private get initialConfig(): TKnex.Config {
        return {
            client: this.appConfig.ENV.DB.DIALECT,
            connection: this.appConfig.ENV.DB.CONNECTION_STRING,
            pool: {
                min: this.appConfig.ENV.DB.POOL_MIN,
                max: this.appConfig.ENV.DB.POOL_MAX,
            },
            migrations: {
                directory: 'src/migrations',
                tableName: DatabaseTableName.MIGRATIONS,
            },
            debug: false,
            ...knexSnakeCaseMappers({
                underscoreBetweenUppercaseLetters: true,
            }),
        };
    }

    private get environmentConfig(): TKnex.Config {
        return this.environmentsConfig[this.appConfig.ENV.APP.ENVIRONMENT];
    }
}

export { Database };
export { DatabaseTableName } from './enums/enums.js';
export { type IDatabase } from './interfaces/interfaces.js';
