import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.js';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    ACTIVITY_TYPE: 'activity_type',
    REQUIREMENT: 'requirement',
    REQUIREMENT_METRIC: 'requirement_metric',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
} as const;

const ACTIVITY_ENUM = `${ColumnName.ACTIVITY_TYPE}_enum`;
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
    await knex.schema.createTable(DatabaseTableName.ACHIEVEMENTS, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.NAME).notNullable();
        table
            .enu(ColumnName.ACTIVITY_TYPE, Object.values(ActivityType), {
                enumName: ACTIVITY_ENUM,
                useNative: true,
            })
            .nullable();
        table.integer(ColumnName.REQUIREMENT).notNullable();
        table
            .enu(ColumnName.REQUIREMENT_METRIC, Object.values(Metric), {
                enumName: REQUIREMENT_METRIC_ENUM,
                useNative: true,
            })
            .nullable();
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
    await knex.schema.dropTableIfExists(DatabaseTableName.ACHIEVEMENTS);
    await knex.schema.raw(`DROP TYPE IF EXISTS ${ACTIVITY_ENUM}`);
    await knex.schema.raw(`DROP TYPE IF EXISTS ${REQUIREMENT_METRIC_ENUM}`);
}

export { down, up };
