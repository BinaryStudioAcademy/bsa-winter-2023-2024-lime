import { type Knex } from 'knex';

const ActivityType = {
    CYCLING: 'cycling',
    RUNNING: 'running',
    WALKING: 'walking',
} as const;

const Metric = {
    KILOMETERS: 'km',
    MINUTES: 'minutes',
    STEPS: 'steps',
    KILOCALORIES: 'kcal',
} as const;

const Achievements = [
    {
        name: 'First 5 km cycling',
        activity: ActivityType.CYCLING,
        requirement: 5,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '20 km journey',
        activity: ActivityType.CYCLING,
        requirement: 20,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '50 km journey',
        activity: ActivityType.CYCLING,
        requirement: 50,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '200 km in a month',
        activity: ActivityType.CYCLING,
        requirement: 200,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '300 km in a month',
        activity: ActivityType.CYCLING,
        requirement: 300,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '2 hours total per weekend',
        activity: ActivityType.CYCLING,
        requirement: 120,
        requirementMetric: Metric.MINUTES,
    },
    {
        name: 'AVG 25 km/h - 20 km ride',
        activity: ActivityType.CYCLING,
        requirement: 20,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '1000 m height per month',
        activity: ActivityType.CYCLING,
        requirement: 1,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 1 km run',
        activity: ActivityType.RUNNING,
        requirement: 1,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 5 km run',
        activity: ActivityType.RUNNING,
        requirement: 5,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 10 km run',
        activity: ActivityType.RUNNING,
        requirement: 10,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 21 km (half marathon)',
        activity: ActivityType.RUNNING,
        requirement: 21,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 42 km (half marathon)',
        activity: ActivityType.RUNNING,
        requirement: 42,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: 'First 30 min run',
        activity: ActivityType.RUNNING,
        requirement: 30,
        requirementMetric: Metric.MINUTES,
    },
    {
        name: '100 km in a month',
        activity: ActivityType.RUNNING,
        requirement: 100,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '10 km per weekend',
        activity: ActivityType.RUNNING,
        requirement: 10,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '20 runs in a month',
        activity: ActivityType.RUNNING,
        requirement: 20,
        requirementMetric: null,
    },
    {
        name: 'First 5000 steps in a day',
        activity: ActivityType.WALKING,
        requirement: 5000,
        requirementMetric: Metric.STEPS,
    },
    {
        name: 'First 10,000  steps in a day',
        activity: ActivityType.WALKING,
        requirement: 10_000,
        requirementMetric: Metric.STEPS,
    },
    {
        name: 'First 15,000 steps in a day',
        activity: ActivityType.WALKING,
        requirement: 15_000,
        requirementMetric: Metric.STEPS,
    },
    {
        name: '10,000 steps everyday in 7 days',
        activity: ActivityType.WALKING,
        requirement: 10_000,
        requirementMetric: Metric.STEPS,
    },
    {
        name: '5 h per weekend',
        activity: ActivityType.WALKING,
        requirement: 300,
        requirementMetric: Metric.MINUTES,
    },
    {
        name: '100 km in a month',
        activity: ActivityType.WALKING,
        requirement: 100,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '10 km walk',
        activity: ActivityType.WALKING,
        requirement: 10,
        requirementMetric: Metric.KILOMETERS,
    },
    {
        name: '500 kcal per walk',
        activity: ActivityType.WALKING,
        requirement: 500,
        requirementMetric: Metric.KILOCALORIES,
    },
    {
        name: 'Joining Lime',
        activity: null,
        requirement: 1,
        requirementMetric: null,
    },
];

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await trx('achievements').del();

        await trx('achievements').insert([...Achievements]);
    });
}

export { seed };
