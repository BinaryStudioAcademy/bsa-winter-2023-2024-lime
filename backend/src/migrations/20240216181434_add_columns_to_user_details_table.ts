import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
    AVATAR_URL: 'avatar_url',
    USERNAME: 'username',
    DATE_OF_BIRTH: 'date_of_birth',
    WEIGHT: 'weight',
    HEIGHT: 'height',
    GENDER: 'gender',
};

const GENDER_ENUM = `${ColumnName.GENDER}_enum`;

const Gender = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'prefer not to say',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.raw(
        `CREATE TYPE ${GENDER_ENUM} AS ENUM ('${Gender.FEMALE}', '${Gender.MALE}', '${Gender.OTHER}');`,
    );

    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.text(ColumnName.AVATAR_URL).nullable();
        table.string(ColumnName.USERNAME).unique().nullable();
        table.date(ColumnName.DATE_OF_BIRTH).nullable();
        table.integer(ColumnName.WEIGHT).unsigned().nullable();
        table.integer(ColumnName.HEIGHT).unsigned().nullable();
    });

    await knex.schema.raw(
        `ALTER TABLE ${TABLE_NAME} ADD COLUMN ${ColumnName.GENDER} ${GENDER_ENUM};`,
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.AVATAR_URL);
        table.dropColumn(ColumnName.USERNAME);
        table.dropColumn(ColumnName.DATE_OF_BIRTH);
        table.dropColumn(ColumnName.WEIGHT);
        table.dropColumn(ColumnName.HEIGHT);
        table.dropColumn(ColumnName.GENDER);
    });

    await knex.schema.raw(`DROP TYPE ${GENDER_ENUM}`);
}

export { down, up };
