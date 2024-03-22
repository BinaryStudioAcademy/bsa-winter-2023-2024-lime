import { type Knex } from 'knex';

const TABLE_NAME = 'user_achievements';
const USERS_TABLE_NAME = 'users';
const ACHIEVEMENTS_TABLE_NAME = 'achievements';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    ACHIEVEMENT_ID: 'achievement_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .unsigned()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(USERS_TABLE_NAME)
            .index()
            .onDelete('CASCADE');
        table
            .integer(ColumnName.ACHIEVEMENT_ID)
            .unsigned()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(ACHIEVEMENTS_TABLE_NAME)
            .onDelete('CASCADE');
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
