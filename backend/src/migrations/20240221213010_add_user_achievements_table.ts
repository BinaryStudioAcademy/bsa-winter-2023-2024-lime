import { type Knex } from 'knex';

const TABLE_NAME = 'user_achievements';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    ACHIEVEMENT_ID: 'achievement_id',
    DATE_ACHIEVED: 'date_achieved',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table
            .integer(ColumnName.ACHIEVEMENT_ID)
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('achievements')
            .onDelete('CASCADE');
        table
            .dateTime(ColumnName.DATE_ACHIEVED)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
