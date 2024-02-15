import { type Knex } from 'knex';

const TABLE_NAME = 'users';
const COLUMN_NAME = 'password_salt';

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(COLUMN_NAME);
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.text(COLUMN_NAME).notNullable();
    });
}

export { down, up };
