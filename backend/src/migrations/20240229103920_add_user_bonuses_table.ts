import { type Knex } from 'knex';

const TABLE_NAME = 'user_bonuses';
const USERS_TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    ACTION_TYPE: 'action_type',
    TRANSACTION_TYPE: 'transaction_type',
    AMOUNT: 'amount',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const ACTION_TYPE_ENUM = `${ColumnName.ACTION_TYPE}_enum`;

const ActionType = {
    INVITED: 'invited',
    REGISTERED: 'registered',
};

const TRANSACTION_TYPE_ENUM = `${ColumnName.TRANSACTION_TYPE}_enum`;

const TransactionType = {
    INCOME: 'income',
    EXSPENSE: 'expense',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.raw(
        `CREATE TYPE ${ACTION_TYPE_ENUM} AS ENUM ('${ActionType.INVITED}', '${ActionType.REGISTERED}');`,
    );
    await knex.schema.raw(
        `CREATE TYPE ${TRANSACTION_TYPE_ENUM} AS ENUM ('${TransactionType.INCOME}', '${TransactionType.EXSPENSE}');`,
    );

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
        table.integer(ColumnName.AMOUNT).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });

    await knex.schema.raw(
        `ALTER TABLE ${TABLE_NAME} ADD COLUMN ${ColumnName.ACTION_TYPE} ${ACTION_TYPE_ENUM};`,
    );
    await knex.schema.raw(
        `ALTER TABLE ${TABLE_NAME} ADD COLUMN ${ColumnName.TRANSACTION_TYPE} ${TRANSACTION_TYPE_ENUM};`,
    );
}
async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(TABLE_NAME);
    await knex.schema.raw(`DROP TYPE ${ACTION_TYPE_ENUM}`);
    await knex.schema.raw(`DROP TYPE ${TRANSACTION_TYPE_ENUM}`);
}

export { down, up };
