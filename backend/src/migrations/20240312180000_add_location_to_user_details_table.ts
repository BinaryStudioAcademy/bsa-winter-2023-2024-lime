import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
    LOCATION: 'location',
};

async function up(knex: Knex): Promise<void> {
    return await knex.schema.table(TABLE_NAME, (table) => {
        table.string(ColumnName.LOCATION).nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.LOCATION);
    });
}

export { down, up };
