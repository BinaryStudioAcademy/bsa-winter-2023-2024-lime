import { type Knex } from 'knex';

const TABLE_NAME = 'workouts';

const ColumnName = {
    PROVIDER: 'provider',
};

const providers = ['google-fit', 'strava'];
const PROVIDER_ENUM_NAME = `${ColumnName.PROVIDER}_enum`;

async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable(TABLE_NAME, (table) => {
        table
            .enum(ColumnName.PROVIDER, providers, {
                useNative: true,
                enumName: PROVIDER_ENUM_NAME,
            })
            .nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.PROVIDER);
    });

    await knex.schema.raw(`DROP TYPE IF EXISTS ${PROVIDER_ENUM_NAME}`);
}

export { down, up };
