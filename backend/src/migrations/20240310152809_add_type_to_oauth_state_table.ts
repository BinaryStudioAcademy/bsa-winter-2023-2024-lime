import { type Knex } from 'knex';

const TABLE_NAME = 'oauth_state';

const ColumnName = {
    TYPE: 'type',
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
            })
            .nullable();
    });
    await knex(TABLE_NAME).update({ [ColumnName.TYPE]: OAuthType.CONNECTION });
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropNullable(ColumnName.TYPE);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.TYPE);
    });
    await knex.schema.raw(`DROP TYPE IF EXISTS ${OAUTH_TYPE_ENUM};`);
}

export { down, up };
