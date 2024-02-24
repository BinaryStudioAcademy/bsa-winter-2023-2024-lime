import { type Knex } from 'knex';

const SUBSCRIPTIONS_TABLE_NAME = 'subscriptions';
const USERS_TABLE_NAME = 'users';
const SUBSCRIPTION_PLANS_TABLE_NAME = 'subscription_plans';

const UsersColumn = {
    CUSTOMER_TOKEN: 'customer_token',
};

const SubscriptionsColumn = {
    ID: 'id',
    USER_ID: 'user_id',
    PLAN_ID: 'plan_id',
    PRICE: 'price',
    STATUS: 'status',
    CANCEL_AT_PERIOD_END: 'cancel_at_period_end',
    SUBSCRIPTION_TOKEN: 'subscription_token',
    EXPIRATION_DATE: 'expiration_date',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(USERS_TABLE_NAME, (table) => {
        table.string(UsersColumn.CUSTOMER_TOKEN).unique().notNullable();
    });

    await knex.schema.createTable(SUBSCRIPTIONS_TABLE_NAME, (table) => {
        table.increments(SubscriptionsColumn.ID).primary();
        table
            .integer(SubscriptionsColumn.USER_ID)
            .unsigned()
            .notNullable()
            .references(SubscriptionsColumn.ID)
            .inTable(USERS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .integer(SubscriptionsColumn.PLAN_ID)
            .unsigned()
            .nullable()
            .references(SubscriptionsColumn.ID)
            .inTable(SUBSCRIPTION_PLANS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .string(SubscriptionsColumn.SUBSCRIPTION_TOKEN)
            .unique()
            .nullable();
        table.boolean(SubscriptionsColumn.CANCEL_AT_PERIOD_END).nullable();
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
    await knex.schema.alterTable(USERS_TABLE_NAME, (table) => {
        table.dropColumn(UsersColumn.CUSTOMER_TOKEN);
    });
    await knex.schema.dropTableIfExists(SUBSCRIPTIONS_TABLE_NAME);
}

export { down, up };
