import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

import { WEEKS_PER_MONTH } from '../constants/constants.js';
import { type ChartGoalDataset } from '../types/chart-goal-dataset.type.js';
import { addWeeks, isSameWeek, startOfMonth, startOfWeek } from './helpers.js';

const generateMonthlyDatasets = (
    today: Date,
    workouts: WorkoutResponseDto[],
): {
    datasets: ChartGoalDataset[];
    labels: string[];
} => {
    const datasets: ChartGoalDataset[] = [];
    const labels: string[] = [];

    const startOfCurrent = startOfMonth(today);
    let firstDayOfWeek = startOfWeek(startOfCurrent);

    for (let week = 1; week <= WEEKS_PER_MONTH; week++) {
        const result = {
            workouts: 0,
            distance: 0,
            kilocalories: 0,
        };

        for (const workout of workouts) {
            const workoutDate = new Date(workout.workoutStartedAt);
            if (isSameWeek(workoutDate, firstDayOfWeek)) {
                result.workouts += workout.duration;
                result.distance += workout.distance;
                result.kilocalories += workout.kilocalories;
            }
        }
        labels.push(`Week ${week}`);
        datasets.push(result);

        firstDayOfWeek = addWeeks(firstDayOfWeek, 1);
    }
    return {
        datasets,
        labels,
    };
};

export { generateMonthlyDatasets };
