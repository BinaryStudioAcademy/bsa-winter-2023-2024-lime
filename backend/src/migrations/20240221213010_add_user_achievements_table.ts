import { type Knex } from 'knex';

const TABLE_NAME = 'user_achievements';

const ColumnName = {
    USER_ID: 'user_id',
    ACHIEVEMENT_ID: 'achievement_id',
    DATE_ACHIEVED: 'date_achieved',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments().primary();
        table.integer(ColumnName.USER_ID).unsigned().notNullable();
        table
            .foreign(ColumnName.USER_ID)
            .references('users.id')
            .onDelete('CASCADE');
        table.integer(ColumnName.ACHIEVEMENT_ID).unsigned().notNullable();
        table
            .foreign(ColumnName.ACHIEVEMENT_ID)
            .references('achievements.id')
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
