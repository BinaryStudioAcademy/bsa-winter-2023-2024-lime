import { type Knex } from 'knex';

import { subscriptionPlans } from '~/seed-data/subscription-plans-data.js';

const SEED = {
    TABLE_NAME: 'subscription_plans',
};

async function seed(knex: Knex): Promise<void> {
    await knex(SEED.TABLE_NAME).del();

    await knex(SEED.TABLE_NAME).insert(subscriptionPlans);
}

export { seed };
