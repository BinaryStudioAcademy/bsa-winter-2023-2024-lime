import { type Knex } from 'knex';

const SUBSCRIPTIONS_TABLE_NAME = 'subscriptions';
const USERS_TABLE_NAME = 'users';
const SUBSCRIPTION_PLANS_TABLE_NAME = 'subscription_plans';

const UsersColumn = {
    STRIPE_CUSTOMER_ID: 'stripe_customer_id',
};

const SubscriptionsColumn = {
    ID: 'id',
    USER_ID: 'user_id',
    PLAN_ID: 'plan_id',
    PRICE: 'price',
    STRIPE_SUBSCRIPTION_ID: 'stripe_subscription_id',
    STATUS: 'status',
    IS_CANCELED: 'is_canceled',
    EXPIRES_AT: 'expires_at',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const Status = {
    INCOMPLETE: 'incomplete',
    INCOMPLETE_EXPIRED: 'incomplete_expired',
    ACTIVE: 'active',
    PAST_DUE: 'past_due',
    CANCELED: 'canceled',
    UNPAID: 'unpaid',
    TRIALING: 'trialing',
    PAUSED: 'paused',
} as const;

const STATUS_ENUM = `${SubscriptionsColumn.STATUS}_enum`;

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(USERS_TABLE_NAME, (table) => {
        table.string(UsersColumn.STRIPE_CUSTOMER_ID).unique().notNullable();
    });

    await knex.schema.raw(
        `CREATE TYPE ${STATUS_ENUM} AS ENUM (
            '${Status.INCOMPLETE}',
            '${Status.INCOMPLETE_EXPIRED}',
            '${Status.ACTIVE}',
            '${Status.PAST_DUE}',
            '${Status.CANCELED}',
            '${Status.UNPAID}',
            '${Status.TRIALING}',
            '${Status.PAUSED}');`,
    );

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
            .notNullable()
            .references(SubscriptionsColumn.ID)
            .inTable(SUBSCRIPTION_PLANS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .string(SubscriptionsColumn.STRIPE_SUBSCRIPTION_ID)
            .unique()
            .notNullable();
        table.boolean(SubscriptionsColumn.IS_CANCELED).notNullable();
        table.dateTime(SubscriptionsColumn.EXPIRES_AT).notNullable();
        table
            .dateTime(SubscriptionsColumn.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(SubscriptionsColumn.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });

    await knex.schema.raw(
        `ALTER TABLE ${SUBSCRIPTIONS_TABLE_NAME}
            ADD COLUMN ${SubscriptionsColumn.STATUS} ${STATUS_ENUM};`,
    );
}
async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(SUBSCRIPTIONS_TABLE_NAME);
    await knex.schema.raw(`DROP TYPE ${STATUS_ENUM}`);

    await knex.schema.alterTable(USERS_TABLE_NAME, (table) => {
        table.dropColumn(UsersColumn.STRIPE_CUSTOMER_ID);
    });
}

export { down, up };
