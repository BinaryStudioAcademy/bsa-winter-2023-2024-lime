import { type Knex } from 'knex';

const TABLE_NAME = 'subscriptions';
const USERS_TABLE_NAME = 'users';
const SUBSCRIPTION_PLANS_TABLE_NAME = 'subscription_plans';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    PLAN_ID: 'plan_id',
    PRICE: 'price',
    SUBSCRIPTION_TOKEN: 'subscription_token',
    CUSTOMER_TOKEN: 'customer_token',
    STATUS: 'status',
    EXPIRATION_DATE: 'expiration_date',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .unsigned()
            .unique()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(USERS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .integer(ColumnName.PLAN_ID)
            .unsigned()
            .unique()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(SUBSCRIPTION_PLANS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string(ColumnName.SUBSCRIPTION_TOKEN).unique().notNullable();
        table.string(ColumnName.CUSTOMER_TOKEN).unique().notNullable();
        table.string(ColumnName.STATUS);
        table.dateTime(ColumnName.EXPIRATION_DATE).notNullable();
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
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
