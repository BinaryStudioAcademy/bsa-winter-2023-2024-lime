import { type Knex } from 'knex';

const TABLE_NAME = 'subscription_plans';
const COLUMN_NAME = 'bonus_points_price';

async function up(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.integer(COLUMN_NAME);
    });
}
async function down(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(COLUMN_NAME);
    });
}

export { down, up };
