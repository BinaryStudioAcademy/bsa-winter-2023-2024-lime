import { type Knex } from 'knex';

import { ActivityType, Metric } from './enums/enums.js';

const Achievements = [
    {
        name: 'Joining Lime',
        activityType: null,
        requirement: 1,
        requirementMetric: null,
    },
    {
        name: 'First 5 km cycling',
        activityType: ActivityType.CYCLING,
        requirement: 5,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '20 km journey',
        activityType: ActivityType.CYCLING,
        requirement: 20,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '50 km journey',
        activityType: ActivityType.CYCLING,
        requirement: 50,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '200 km in a month',
        activityType: ActivityType.CYCLING,
        requirement: 200,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '300 km in a month',
        activityType: ActivityType.CYCLING,
        requirement: 300,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '2 hours total',
        activityType: ActivityType.CYCLING,
        requirement: 120,
        requirementMetric: Metric.MINUTES,
    },
    {
        name: '5 hours total',
        activityType: ActivityType.CYCLING,
        requirement: 300,
        requirementMetric: Metric.MINUTES,
    },
    {
        name: 'First 1 km run',
        activityType: ActivityType.RUNNING,
        requirement: 1,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 5 km run',
        activityType: ActivityType.RUNNING,
        requirement: 5,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 10 km run',
        activityType: ActivityType.RUNNING,
        requirement: 10,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 21 km (half marathon)',
        activityType: ActivityType.RUNNING,
        requirement: 21,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 42 km (marathon)',
        activityType: ActivityType.RUNNING,
        requirement: 42,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 30 min run',
        activityType: ActivityType.RUNNING,
        requirement: 30,
        requirementMetric: Metric.MINUTES,
    },
    {
        name: 'First 1 hour run',
        activityType: ActivityType.RUNNING,
        requirement: 60,
        requirementMetric: Metric.MINUTES,
    },
    {
        name: '100 km in a month',
        activityType: ActivityType.RUNNING,
        requirement: 100,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '200 km in a month',
        activityType: ActivityType.RUNNING,
        requirement: 200,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 5000 steps',
        activityType: ActivityType.WALKING,
        requirement: 5000,
        requirementMetric: Metric.STEPS,
    },
    {
        name: 'First 10,000 steps',
        activityType: ActivityType.WALKING,
        requirement: 10_000,
        requirementMetric: Metric.STEPS,
    },
    {
        name: 'First 15,000 steps',
        activityType: ActivityType.WALKING,
        requirement: 15_000,
        requirementMetric: Metric.STEPS,
    },
    {
        name: 'First 20,000 steps',
        activityType: ActivityType.WALKING,
        requirement: 20_000,
        requirementMetric: Metric.STEPS,
    },
    {
        name: '100 km in a month',
        activityType: ActivityType.WALKING,
        requirement: 100,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '10 km walk',
        activityType: ActivityType.WALKING,
        requirement: 10,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '20 km walk',
        activityType: ActivityType.WALKING,
        requirement: 20,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '500 kcal per walk',
        activityType: ActivityType.WALKING,
        requirement: 500,
        requirementMetric: Metric.KILOCALORIES,
    },
    {
        name: '1000 kcal per walk',
        activityType: ActivityType.WALKING,
        requirement: 1000,
        requirementMetric: Metric.KILOCALORIES,
    },
];

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await trx('achievements').del();

        await trx('achievements').insert([...Achievements]);
    });
}

export { seed };
