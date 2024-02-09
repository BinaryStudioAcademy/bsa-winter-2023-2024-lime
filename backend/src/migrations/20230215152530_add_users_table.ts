import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    EMAIL: 'email',
    PASSWORD_HASH: 'password_hash',
    PASSWORD_SALT: 'password_salt',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.EMAIL).unique().notNullable();
        table.text(ColumnName.PASSWORD_HASH).notNullable();
        table.text(ColumnName.PASSWORD_SALT).notNullable();
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

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
