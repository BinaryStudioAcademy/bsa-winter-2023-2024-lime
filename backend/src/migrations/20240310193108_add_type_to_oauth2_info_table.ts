import { type Knex } from 'knex';

const TABLE_NAME = 'oauth_info';

const ColumnName = {
    USER_ID: 'user_id',
    TYPE: 'type',
    PROVIDER: 'provider',
};

const OAUTH_TYPE_ENUM = 'oauth_type_enum';

const OAuthType = {
    CONNECTION: 'connection',
    IDENTITY: 'identity',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table
            .enum(ColumnName.TYPE, Object.values(OAuthType), {
                useNative: true,
                enumName: OAUTH_TYPE_ENUM,
                existingType: true,
            })
            .nullable();
    });
    await knex(TABLE_NAME).update({ [ColumnName.TYPE]: OAuthType.CONNECTION });
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropNullable(ColumnName.TYPE);
        table.dropUnique([ColumnName.USER_ID, ColumnName.PROVIDER]);
        table.unique([
            ColumnName.USER_ID,
            ColumnName.PROVIDER,
            ColumnName.TYPE,
        ]);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.TYPE);
    });
}

export { down, up };
