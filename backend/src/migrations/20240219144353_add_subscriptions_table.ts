import { type Knex } from 'knex';

const SUBSCRIPTIONS_TABLE_NAME = 'subscriptions';
const USERS_TABLE_NAME = 'users';
const SUBSCRIPTION_PLANS_TABLE_NAME = 'subscription_plans';

const SubscriptionsColumn = {
    ID: 'id',
    USER_ID: 'user_id',
    PLAN_ID: 'plan_id',
    PRICE: 'price',
    STATUS: 'status',
    CUSTOMER_TOKEN: 'customer_token',
    SUBSCRIPTION_TOKEN: 'subscription_token',
    EXPIRATION_DATE: 'expiration_date',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(SUBSCRIPTIONS_TABLE_NAME, (table) => {
        table.increments(SubscriptionsColumn.ID).primary();
        table
            .integer(SubscriptionsColumn.USER_ID)
            .unsigned()
            .unique()
            .notNullable()
            .references(SubscriptionsColumn.ID)
            .inTable(USERS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .integer(SubscriptionsColumn.PLAN_ID)
            .unsigned()
            .unique()
            .nullable()
            .references(SubscriptionsColumn.ID)
            .inTable(SUBSCRIPTION_PLANS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .string(SubscriptionsColumn.SUBSCRIPTION_TOKEN)
            .unique()
            .nullable();
        table.string(SubscriptionsColumn.CUSTOMER_TOKEN).unique().nullable();
        table.string(SubscriptionsColumn.STATUS).nullable();
        table.dateTime(SubscriptionsColumn.EXPIRATION_DATE).nullable();
        table
            .dateTime(SubscriptionsColumn.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(SubscriptionsColumn.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}
async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(SUBSCRIPTIONS_TABLE_NAME);
}

export { down, up };
