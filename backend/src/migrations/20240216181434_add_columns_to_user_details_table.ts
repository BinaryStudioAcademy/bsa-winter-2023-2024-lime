import { type Knex } from 'knex';
import { Gender } from 'shared';

const TABLE_NAME = 'user_details';

const ColumnName = {
    AVATAR_URL: 'avatar_url',
    USERNAME: 'username',
    DATE_OF_BIRTH: 'date_of_birth',
    WEIGHT: 'weight',
    HEIGHT: 'height',
    GENDER: 'gender',
};

async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.text(ColumnName.AVATAR_URL).nullable();
        table.string(ColumnName.USERNAME).unique().nullable();
        table.dateTime(ColumnName.DATE_OF_BIRTH).nullable();
        table.integer(ColumnName.WEIGHT).unsigned().nullable();
        table.integer(ColumnName.HEIGHT).unsigned().nullable();
        table
            .enu(ColumnName.GENDER, [Gender.FEMALE, Gender.MALE, Gender.OTHER])
            .nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.AVATAR_URL);
        table.dropColumn(ColumnName.USERNAME);
        table.dropColumn(ColumnName.DATE_OF_BIRTH);
        table.dropColumn(ColumnName.WEIGHT);
        table.dropColumn(ColumnName.HEIGHT);
        table.dropColumn(ColumnName.GENDER);
    });
}

export { down, up };
