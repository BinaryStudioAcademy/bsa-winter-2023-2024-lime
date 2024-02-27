import { type Knex } from 'knex';

const TABLE_NAME = 'goals';
const USERS_TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    ACTIVITY_TYPE: 'activity_type',
    FREQUENCY: 'frequency',
    FREQUENCY_TYPE: 'frequency_type',
    DISTANCE: 'distance',
    DURATION: 'duration',
    PROGRESS: 'progress',
    COMPLETED_AT: 'completed_at',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const ACTIVITY_TYPE_ENUM = `${ColumnName.ACTIVITY_TYPE}_enum`;

const FREQUENCY_TYPE_ENUM = `${ColumnName.FREQUENCY_TYPE}_enum`;

const ActivityType = {
    CYCLING: 'cycling',
    RUNNING: 'running',
    WALKING: 'walking',
};

const FrequencyType = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
};

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
        table
            .enum(ColumnName.ACTIVITY_TYPE, Object.values(ActivityType), {
                useNative: true,
                enumName: ACTIVITY_TYPE_ENUM,
            })
            .notNullable();
        table.integer(ColumnName.FREQUENCY).unsigned().notNullable();
        table
            .enum(ColumnName.FREQUENCY_TYPE, Object.values(FrequencyType), {
                useNative: true,
                enumName: FREQUENCY_TYPE_ENUM,
            })
            .notNullable();
        table.float(ColumnName.DISTANCE).unsigned().nullable();
        table.integer(ColumnName.DURATION).unsigned().nullable();
        table
            .float(ColumnName.PROGRESS)
            .unsigned()
            .notNullable()
            .checkBetween([0, 100]);
        table.dateTime(ColumnName.COMPLETED_AT).nullable();
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
    await knex.schema.raw(`DROP TYPE IF EXISTS ${ACTIVITY_TYPE_ENUM};`);
    await knex.schema.raw(`DROP TYPE IF EXISTS ${FREQUENCY_TYPE_ENUM};`);
}

export { down, up };
