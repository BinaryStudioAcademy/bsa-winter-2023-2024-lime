import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
    REFERRAL_CODE: 'referral_code',
    BONUS_BALANCE: 'bonus_balance',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.REFERRAL_CODE).unique().nullable();
        table.integer(ColumnName.BONUS_BALANCE).nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.REFERRAL_CODE);
        table.dropColumn(ColumnName.BONUS_BALANCE);
    });
}

export { down, up };
