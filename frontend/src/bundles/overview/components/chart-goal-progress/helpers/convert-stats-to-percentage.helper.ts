import { type ChartGoalDataset } from '../types/types.js';

const defaultValue = 0;

const convertStatsToPercentage = (
    datasets: ChartGoalDataset[],
): ChartGoalDataset[] => {
    let biggestWorkout = defaultValue;
    let biggestSteps = defaultValue;
    let biggestKilocalories = defaultValue;

    for (const data of datasets) {
        if (data.workouts > biggestWorkout) {
            biggestWorkout = data.workouts;
        }

        if (data.steps > biggestSteps) {
            biggestSteps = data.steps;
        }

        if (data.kilocalories > biggestKilocalories) {
            biggestKilocalories = data.kilocalories;
        }
    }

    return datasets.map((data) => ({
        workouts: (data.workouts / biggestWorkout) * 100,
        steps: (data.steps / biggestSteps) * 100,
        kilocalories: (data.kilocalories / biggestKilocalories) * 100,
    }));
};

export { convertStatsToPercentage };
