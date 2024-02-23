import { type Knex } from 'knex';

const TABLE_NAME = 'user_workouts';
const USERS_TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    STEPS: 'steps',
    DURATION: 'duration',
    KILOCALORIES: 'kilocalories',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};
async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .unsigned()
            .unique()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(USERS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.integer(ColumnName.STEPS).nullable();
        table.integer(ColumnName.KILOCALORIES).nullable();
        table.timestamp(ColumnName.DURATION).nullable();

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
