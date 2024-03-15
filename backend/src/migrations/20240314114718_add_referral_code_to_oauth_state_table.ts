import { type Knex } from 'knex';

const TABLE_NAME = 'oauth_state';

const ColumnName = {
    REFERRAL_CODE: 'referral_code',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.REFERRAL_CODE).nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.REFERRAL_CODE);
    });
}

export { down, up };
