import { type Knex } from 'knex';

const TABLE_NAME = 'oauth_info';
const USERS_TABLE_NAME = 'users';
const PROVIDER_ENUM_NAME = 'provider_enum';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    TOKEN_TYPE: 'token_type',
    EXPIRES_AT: 'expires_at',
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    SCOPE: 'scope',
    PROVIDER: 'provider',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const Providers = ['Strava', 'Google Fit'];

async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .unsigned()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(USERS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string(ColumnName.TOKEN_TYPE).notNullable();
        table.bigInteger(ColumnName.EXPIRES_AT).unsigned().notNullable();
        table.text(ColumnName.ACCESS_TOKEN).notNullable();
        table.text(ColumnName.REFRESH_TOKEN).notNullable();
        table.string(ColumnName.SCOPE).notNullable();
        table
            .enum(ColumnName.PROVIDER, Providers, {
                useNative: true,
                enumName: PROVIDER_ENUM_NAME,
            })
            .notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());

        table.unique([ColumnName.USER_ID, ColumnName.PROVIDER]);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(TABLE_NAME);

    await knex.schema.raw(`DROP TYPE ${PROVIDER_ENUM_NAME}`);
}

export { down, up };
