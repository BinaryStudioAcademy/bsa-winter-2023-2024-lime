import { type Knex } from 'knex';

const TABLE_NAME = 'oauth_state';

const ColumnName = {
    USER_ID: 'user_id',
};

async function up(knex: Knex): Promise<void> {
    return await knex.schema.table(TABLE_NAME, (table) => {
        table.integer(ColumnName.USER_ID).nullable().alter();
    });
}

async function down(): Promise<void> {}

export { down, up };
