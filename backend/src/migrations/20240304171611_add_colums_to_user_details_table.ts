import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const USER_BONUSES_TABLE_NAME = 'user_bonuses';

const UserDetailsColumnName = {
    USER_ID: 'user_id',
    REFERRAL_CODE: 'referral_code',
    BONUS_BALANCE: 'bonus_balance',
};

const UserBonusesColumnName = {
    USER_ID: 'user_id',
    AMOUNT: 'amount',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(UserDetailsColumnName.REFERRAL_CODE).unique().nullable();
        table.integer(UserDetailsColumnName.BONUS_BALANCE).nullable();
    });

    await knex.schema.raw(`
        CREATE OR REPLACE FUNCTION update_user_balance()
        RETURNS TRIGGER AS $$
        BEGIN
            IF TG_OP = 'INSERT' THEN
                UPDATE ${TABLE_NAME}
                SET ${UserDetailsColumnName.BONUS_BALANCE} = COALESCE(${UserDetailsColumnName.BONUS_BALANCE}, 0) + COALESCE(NEW.${UserBonusesColumnName.AMOUNT}, 0)
                WHERE ${UserDetailsColumnName.USER_ID} = NEW.${UserBonusesColumnName.USER_ID};
            END IF;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `);

    await knex.schema.raw(`
        CREATE TRIGGER update_user_balance_trigger
        AFTER INSERT ON ${USER_BONUSES_TABLE_NAME}
        FOR EACH ROW
        EXECUTE PROCEDURE update_user_balance();
    `);
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.raw(`
        DROP TRIGGER IF EXISTS update_user_balance_trigger ON ${USER_BONUSES_TABLE_NAME};
    `);

    await knex.schema.raw(`
        DROP FUNCTION IF EXISTS update_user_balance();
    `);

    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(UserDetailsColumnName.REFERRAL_CODE);
        table.dropColumn(UserDetailsColumnName.BONUS_BALANCE);
    });
}

export { down, up };
