import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.js';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    TITLE: 'title',
    MESSAGE: 'message',
    IS_READ: 'isRead',
    TYPE: 'type',
};

const NotificationType = {
    DEFAULT: 'default',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(DatabaseTableName.NOTIFICATIONS, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .unsigned()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onDelete('CASCADE');
        table.string(ColumnName.TITLE).nullable();
        table.string(ColumnName.MESSAGE).notNullable();
        table.boolean(ColumnName.IS_READ).defaultTo(false);
        table.string(ColumnName.TYPE).defaultTo(NotificationType.DEFAULT);
        table
            .dateTime(ColumnName.CREATED_AT)
            .defaultTo(knex.fn.now())
            .notNullable();
        table
            .dateTime(ColumnName.UPDATED_AT)
            .defaultTo(knex.fn.now())
            .notNullable();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(DatabaseTableName.NOTIFICATIONS);
}

export { down, up };
