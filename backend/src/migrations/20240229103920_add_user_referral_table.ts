import { type Knex } from 'knex';

const TABLE_NAME = 'user_referral';
const USERS_TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    REFERRAL_USER_ID: 'referral_user_id',
    REFERRAL_CODE: 'referral_code',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .unsigned()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(USERS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer(ColumnName.REFERRAL_USER_ID).nullable();
        table.string(ColumnName.REFERRAL_CODE).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}
async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
