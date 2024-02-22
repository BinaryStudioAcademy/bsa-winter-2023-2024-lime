import { type Knex } from 'knex';

const TABLE_NAME = 'workouts';

const ColumnName = {
    ID: 'id',
    WORKOUT_TYPE: 'workout_type',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};
async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.WORKOUT_TYPE).nullable();
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
