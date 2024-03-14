import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const ColumnName = {
    PASSWORD_HASH: 'password_hash',
};

async function up(knex: Knex): Promise<void> {
    return await knex.schema.table(TABLE_NAME, (table) => {
        table.text(ColumnName.PASSWORD_HASH).nullable().alter();
    });
}

async function down(): Promise<void> {}

export { down, up };
