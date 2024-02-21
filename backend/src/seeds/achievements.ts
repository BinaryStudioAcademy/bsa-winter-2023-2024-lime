import { type Knex } from 'knex';

const Activities = {
    CYCLING: 'cycling',
    RUNNING: 'running',
    WALKING: 'walking',
};

const Achievements = [
    {
        name: 'First 5 km Cycling',
        activity: Activities.CYCLING,
        requirement: '5 km',
    },
    {
        name: 'First 30 min run',
        activity: Activities.RUNNING,
        requirement: '30 min',
    },
    {
        name: 'First 5000 steps in a day',
        activity: Activities.WALKING,
        requirement: '5000 steps',
    },
];

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await trx('achievements').del();

        await trx('achievements').insert([...Achievements]);
    });
}

export { seed };
