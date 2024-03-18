import { type Knex } from 'knex';

const TABLE_NAME = 'workouts';

const ColumnName = {
    ACTIVITY_ID: 'activity_id',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.ACTIVITY_ID).alter();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.float(ColumnName.ACTIVITY_ID).alter();
    });
}

export { down, up };
