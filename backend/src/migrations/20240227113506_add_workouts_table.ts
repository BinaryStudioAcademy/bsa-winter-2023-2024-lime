import { type Knex } from 'knex';

const TABLE_NAME = 'workouts';
const USERS_TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    ACTIVITY_TYPE: 'activity_type',
    ACTIVITY_ID: 'activity_id',
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
        table.float(ColumnName.STEPS).nullable();
        table.integer(ColumnName.ACTIVITY_ID).nullable();
        table.float(ColumnName.KILOCALORIES).notNullable();
        table.float(ColumnName.HEART_RATE).nullable();
        table
            .dateTime(ColumnName.WORKOUT_STARTED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table.dateTime(ColumnName.WORKOUT_ENDED_AT).notNullable();
        table.float(ColumnName.DISTANCE).notNullable();
        table.float(ColumnName.SPEED).notNullable();
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
