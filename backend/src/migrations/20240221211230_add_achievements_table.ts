import { type Knex } from 'knex';

const TABLE_NAME = 'achievements';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    ACTIVITY: 'activity',
    REQUIREMENT: 'requirement',
    CREATED_AT: 'created_at',
};

const Activities = {
    CYCLING: 'cycling',
    RUNNING: 'running',
    WALKING: 'walking',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.NAME).notNullable();
        table
            .enum(ColumnName.ACTIVITY, Object.values(Activities))
            .notNullable();
        table.text(ColumnName.REQUIREMENT).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
