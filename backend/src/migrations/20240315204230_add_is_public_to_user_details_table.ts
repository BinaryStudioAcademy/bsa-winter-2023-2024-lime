import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
    IS_PUBLIC: 'is_public',
};

async function up(knex: Knex): Promise<void> {
    return await knex.schema.table(TABLE_NAME, (table) => {
        table.boolean(ColumnName.IS_PUBLIC).notNullable().defaultTo(false);
    });
}

async function down(knex: Knex): Promise<void> {
    return await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.IS_PUBLIC);
    });
}

export { down, up };
