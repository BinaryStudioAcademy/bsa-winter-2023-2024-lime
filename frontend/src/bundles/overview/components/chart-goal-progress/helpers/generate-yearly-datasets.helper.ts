import { subMonths } from 'date-fns';

import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

import { MONTHS_PER_YEAR } from '../constants/constants.js';
import { type ChartGoalDataset } from '../types/chart-goal-dataset.type.js';
import { addMonths, isSameMonth, startOfMonth } from './helpers.js';

const generateYearlyDatasets = (
    today: Date,
    workouts: WorkoutResponseDto[],
): {
    datasets: ChartGoalDataset[];
    labels: string[];
} => {
    const datasets: ChartGoalDataset[] = [];
    const labels: string[] = [];

    const oneYearAgo = subMonths(today, MONTHS_PER_YEAR - 1);
    let firstDayOfMonth = startOfMonth(oneYearAgo);

    for (let month = 1; month <= MONTHS_PER_YEAR; month++) {
        const result = {
            workouts: 0,
            distance: 0,
            kilocalories: 0,
        };

        for (const workout of workouts) {
            const workoutDate = new Date(workout.workoutStartedAt);

            if (isSameMonth(workoutDate, firstDayOfMonth)) {
                result.workouts += workout.duration;
                result.distance += workout.distance;
                result.kilocalories += workout.kilocalories;
            }
        }
        labels.push(
            firstDayOfMonth.toLocaleString('en-US', { month: 'short' }),
        );
        datasets.push(result);

        firstDayOfMonth = addMonths(firstDayOfMonth, 1);
    }

    return {
        datasets,
        labels,
    };
};

export { generateYearlyDatasets };
