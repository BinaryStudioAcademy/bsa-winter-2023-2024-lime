import { type Knex } from 'knex';

const TABLE_NAME = 'achievements';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    ACTIVITY: 'activity',
    REQUIREMENT: 'requirement',
    REQUIREMENT_METRIC: 'requirement_metric',
    CREATED_AT: 'created_at',
} as const;

const ACTIVITY_ENUM = `${ColumnName.ACTIVITY}_enum`;
const REQUIREMENT_METRIC_ENUM = `${ColumnName.REQUIREMENT_METRIC}_enum`;

const ActivityType = {
    CYCLING: 'cycling',
    RUNNING: 'running',
    WALKING: 'walking',
} as const;

const Metric = {
    KILOMETERS: 'km',
    MINUTES: 'minutes',
    STEPS: 'steps',
    KILOCALORIES: 'kcal',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.NAME).notNullable();
        table
            .enu(ColumnName.ACTIVITY, Object.values(ActivityType), {
                enumName: ACTIVITY_ENUM,
                useNative: true,
            })
            .notNullable();
        table.integer(ColumnName.REQUIREMENT).notNullable();
        table
            .enu(ColumnName.REQUIREMENT_METRIC, Object.values(Metric), {
                enumName: REQUIREMENT_METRIC_ENUM,
                useNative: true,
            })
            .notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
