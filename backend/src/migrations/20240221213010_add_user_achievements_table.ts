import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.js';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    ACHIEVEMENT_ID: 'achievement_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(
        DatabaseTableName.USER_ACHIEVEMENTS,
        (table) => {
            table.increments(ColumnName.ID).primary();
            table
                .integer(ColumnName.USER_ID)
                .unsigned()
                .notNullable()
                .references(ColumnName.ID)
                .inTable(DatabaseTableName.USERS)
                .index()
                .onDelete('CASCADE');
            table
                .integer(ColumnName.ACHIEVEMENT_ID)
                .unsigned()
                .notNullable()
                .references(ColumnName.ID)
                .inTable(DatabaseTableName.ACHIEVEMENTS)
                .onDelete('CASCADE');
            table
                .dateTime(ColumnName.CREATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime(ColumnName.UPDATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        },
    );
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DatabaseTableName.USER_ACHIEVEMENTS);
}

export { down, up };
