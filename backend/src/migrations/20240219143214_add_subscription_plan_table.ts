import { type Knex } from 'knex';

const TABLE_NAME = 'subscription_plans';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    DESCRIPTION: 'description',
    PRICE: 'price',
    PRODUCT_TOKEN: 'product_token',
    PRICE_TOKEN: 'price_token',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.NAME).unique().notNullable();
        table.decimal(ColumnName.PRICE).notNullable();
        table.text(ColumnName.DESCRIPTION);
        table.string(ColumnName.PRODUCT_TOKEN).unique().notNullable();
        table.string(ColumnName.PRICE_TOKEN).unique().notNullable();
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
