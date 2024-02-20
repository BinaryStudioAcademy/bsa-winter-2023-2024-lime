import { type Knex } from 'knex';

const SUBSCRIPTIONS_TABLE_NAME = 'subscriptions';
const USERS_TABLE_NAME = 'users';
const USERS_DETAILS_TABLE_NAME = 'user_details';
const SUBSCRIPTION_PLANS_TABLE_NAME = 'subscription_plans';

const UserDetailsColumn = {
    CUSTOMER_TOKEN: 'customer_token',
};

const SubscriptionsColumn = {
    ID: 'id',
    USER_ID: 'user_id',
    PLAN_ID: 'plan_id',
    PRICE: 'price',
    SUBSCRIPTION_TOKEN: 'subscription_token',
    STATUS: 'status',
    EXPIRATION_DATE: 'expiration_date',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(USERS_DETAILS_TABLE_NAME, (table) => {
        table.string(UserDetailsColumn.CUSTOMER_TOKEN).unique().nullable();
    });

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
            .notNullable()
            .references(SubscriptionsColumn.ID)
            .inTable(SUBSCRIPTION_PLANS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .string(SubscriptionsColumn.SUBSCRIPTION_TOKEN)
            .unique()
            .notNullable();
        table.string(SubscriptionsColumn.STATUS).notNullable();
        table.dateTime(SubscriptionsColumn.EXPIRATION_DATE).notNullable();
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
    await knex.schema.dropTableIfExists(USERS_DETAILS_TABLE_NAME);
    await knex.schema.dropTableIfExists(SUBSCRIPTIONS_TABLE_NAME);
}

export { down, up };
