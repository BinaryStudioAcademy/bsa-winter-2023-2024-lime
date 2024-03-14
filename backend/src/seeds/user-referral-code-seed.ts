import crypto from 'node:crypto';

import { type Knex } from 'knex';

const SEED = {
    TABLE_NAME: 'user_details',
};

async function seed(knex: Knex): Promise<void> {
    const usersToUpdate = await knex(SEED.TABLE_NAME)
        .whereNull('referralCode')
        .select('id');

    for (const user of usersToUpdate) {
        const referralCode = crypto.randomUUID();
        await knex(SEED.TABLE_NAME)
            .where({ id: user.id })
            .update({ referralCode });
    }
}

export { seed };
