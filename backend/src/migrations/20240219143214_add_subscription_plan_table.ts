import { type Knex } from 'knex';

const TABLE_NAME = 'subscription_plans';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    DESCRIPTION: 'description',
    PRICE: 'price',
    STRIPE_PRODUCT_ID: 'stripe_product_id',
    STRIPE_PRICE_ID: 'stripe_price_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.NAME).unique().notNullable();
        table.decimal(ColumnName.PRICE).notNullable();
        table.text(ColumnName.DESCRIPTION);
        table.string(ColumnName.STRIPE_PRODUCT_ID).unique().notNullable();
        table.string(ColumnName.STRIPE_PRICE_ID).unique().notNullable();
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
