import { type Knex } from 'knex';

const TABLE_NAME = 'user_bonuses';

const ColumnName = {
    ACTION_TYPE: 'action_type',
};

const ACTION_TYPE_ENUM = `${ColumnName.ACTION_TYPE}_enum`;

const ActionType = {
    INVITED: 'invited',
    REGISTERED: 'registered',
    SUBSCRIBE: 'subscribe',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.raw(
        `ALTER TYPE ${ACTION_TYPE_ENUM} ADD VALUE '${ActionType.SUBSCRIBE}';`,
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.ACTION_TYPE);
    });
}

export { down, up };
