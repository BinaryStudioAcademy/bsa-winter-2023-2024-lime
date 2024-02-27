import { type Knex } from 'knex';

const TABLE_NAME = 'user_workouts';
const USERS_TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    ACTIVITY: 'activity',
    STEPS: 'steps',
    DURATION: 'duration',
    KILOCALORIES: 'kilocalories',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const ACTIVITY_ENUM = `${ColumnName.ACTIVITY}_enum`;

const Activity = {
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
        table.integer(ColumnName.KILOCALORIES).nullable();
        table.integer(ColumnName.DURATION).nullable();
        table.enum(ColumnName.ACTIVITY, Object.values(Activity), {
            useNative: true,
            enumName: `${ColumnName.ACTIVITY}_enum`,
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
