import { type Knex } from 'knex';

const TABLE_NAME = 'oauth_info';

const ColumnName = {
    OWNER_ID: 'owner_id',
};

async function up(knex: Knex): Promise<void> {
    return await knex.schema.table(TABLE_NAME, (table) => {
        table.integer(ColumnName.OWNER_ID).nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.OWNER_ID);
    });
}

export { down, up };
