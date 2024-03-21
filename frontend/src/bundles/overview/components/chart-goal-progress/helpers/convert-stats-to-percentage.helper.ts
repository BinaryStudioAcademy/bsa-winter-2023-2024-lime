import { type ChartGoalDataset } from '../types/types.js';

const defaultValue = 0;

const convertStatsToPercentage = (
    datasets: ChartGoalDataset[],
): ChartGoalDataset[] => {
    let biggestWorkout = defaultValue;
    let biggestDistance = defaultValue;
    let biggestKilocalories = defaultValue;

    for (const data of datasets) {
        if (data.workouts > biggestWorkout) {
            biggestWorkout = data.workouts;
        }

        if (data.distance > biggestDistance) {
            biggestDistance = data.distance;
        }

        if (data.kilocalories > biggestKilocalories) {
            biggestKilocalories = data.kilocalories;
        }
    }

    return datasets.map((data) => ({
        workouts: (data.workouts / biggestWorkout) * 100,
        distance: (data.distance / biggestDistance) * 100,
        kilocalories: (data.kilocalories / biggestKilocalories) * 100,
    }));
};

export { convertStatsToPercentage };
