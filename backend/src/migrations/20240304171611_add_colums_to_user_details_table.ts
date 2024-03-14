import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const UserDetailsColumnName = {
    USER_ID: 'user_id',
    REFERRAL_CODE: 'referral_code',
    BONUS_BALANCE: 'bonus_balance',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(UserDetailsColumnName.REFERRAL_CODE).unique().nullable();
        table.integer(UserDetailsColumnName.BONUS_BALANCE).nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(UserDetailsColumnName.REFERRAL_CODE);
        table.dropColumn(UserDetailsColumnName.BONUS_BALANCE);
    });
}

export { down, up };
