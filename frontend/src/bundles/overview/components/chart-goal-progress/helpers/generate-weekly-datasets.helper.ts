import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

import { DAYS_PER_WEEK } from '../constants/days-per-week.constant.js';
import { type ChartGoalDataset } from '../types/chart-goal-dataset.type.js';
import { addDays, isSameDay, subWeeks } from './helpers.js';

const generateWeeklyDatasets = (
    today: Date,
    workouts: WorkoutResponseDto[],
): {
    datasets: ChartGoalDataset[];
    labels: string[];
} => {
    const datasets: ChartGoalDataset[] = [];
    const labels: string[] = [];

    const weekAgo = subWeeks(today, 1);

    for (let day = 1; day <= DAYS_PER_WEEK; day++) {
        const dayOfWeek = addDays(weekAgo, day);

        const result = {
            workouts: 0,
            distance: 0,
            kilocalories: 0,
        };

        for (const workout of workouts) {
            if (isSameDay(new Date(workout.workoutStartedAt), dayOfWeek)) {
                result.workouts += workout.duration;
                result.distance += workout.distance;
                result.kilocalories += workout.kilocalories;
            }
        }

        labels.push(dayOfWeek.toLocaleString('en-US', { weekday: 'short' }));
        datasets.push(result);
    }
    return {
        datasets,
        labels,
    };
};

export { generateWeeklyDatasets };
