import { type Knex } from 'knex';

const TABLE_NAME = 'workouts';
const USERS_TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    ACTIVITY_TYPE: 'activity_type',
    STEPS: 'steps',
    HEART_RATE: 'heart_rate',
    WORKOUT_STARTED_AT: 'workout_started_at',
    WORKOUT_ENDED_AT: 'workout_ended_at',
    DISTANCE: 'distance',
    SPEED: 'speed',
    KILOCALORIES: 'kilocalories',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const ACTIVITY_ENUM = `${ColumnName.ACTIVITY_TYPE}_enum`;

const ActivityType = {
    CYCLING: 'cycling',
    RUNNING: 'running',
    WALKING: 'walking',
} as const;
async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .unsigned()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(USERS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer(ColumnName.STEPS).nullable();
        table.integer(ColumnName.KILOCALORIES).notNullable();
        table.integer(ColumnName.HEART_RATE).notNullable();
        table
            .dateTime(ColumnName.WORKOUT_STARTED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table.dateTime(ColumnName.WORKOUT_ENDED_AT).notNullable();
        table.integer(ColumnName.DISTANCE).notNullable();
        table.integer(ColumnName.SPEED).notNullable();
        table.enum(ColumnName.ACTIVITY_TYPE, Object.values(ActivityType), {
            useNative: true,
            enumName: ACTIVITY_ENUM,
            existingType: true,
        });
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
    await knex.schema.dropTableIfExists(TABLE_NAME);
    await knex.schema.raw(`DROP TYPE IF EXISTS ${ACTIVITY_ENUM}`);
}

export { down, up };
