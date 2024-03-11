import { type Knex } from 'knex';

const PROVIDER_ENUM_NAME = 'oauth_provider_enum';

const newType = 'google';

async function up(knex: Knex): Promise<void> {
    return await knex.schema.raw(
        `ALTER TYPE ${PROVIDER_ENUM_NAME} ADD VALUE '${newType}'`,
    );
}

async function down(): Promise<void> {}

export { down, up };
