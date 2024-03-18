import { type Knex } from 'knex';

const TABLE_NAME = 'schedules';
const USERS_TABLE_NAME = 'users';
const GOALS_TABLE_NAME = 'goals';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    GOAL_ID: 'goal_id',
    ACTIVITY_TYPE: 'activity_type',
    START_AT: 'start_at',
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
        table
            .integer(ColumnName.GOAL_ID)
            .unsigned()
            .nullable()
            .references(ColumnName.ID)
            .inTable(GOALS_TABLE_NAME)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .dateTime(ColumnName.START_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
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
