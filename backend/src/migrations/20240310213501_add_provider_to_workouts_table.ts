import { type Knex } from 'knex';

const TABLE_NAME = 'workouts';

const ColumnName = {
    PROVIDER: 'provider',
};

const PROVIDER_ENUM_NAME = 'oauth_provider_enum';

async function up(knex: Knex): Promise<void> {
    await knex.schema.raw(
        `ALTER TABLE ${TABLE_NAME} ADD COLUMN ${ColumnName.PROVIDER} ${PROVIDER_ENUM_NAME};`,
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.PROVIDER);
    });
}

export { down, up };
