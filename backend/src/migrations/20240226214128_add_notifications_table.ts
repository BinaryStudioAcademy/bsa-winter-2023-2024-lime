import { type Knex } from 'knex';

import { NotificationType } from '~/bundles/notifications/notifications.js';

const TABLE_NAME = 'notifications';
const USERS_TABLE_NAME = 'users';

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

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .unsigned()
            .notNullable()
            .references('id')
            .inTable(USERS_TABLE_NAME)
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
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
    await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
