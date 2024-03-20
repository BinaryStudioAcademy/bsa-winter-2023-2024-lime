import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

import { type ChartGoalDataset } from '../types/chart-goal-dataset.type.js';

const generateYearlyDatasets = (
    today: Date,
    workouts: WorkoutResponseDto[],
): {
    datasets: ChartGoalDataset[];
    labels: string[];
} => {
    const datasets: ChartGoalDataset[] = [];
    const labels: string[] = [];

    const totalMonths = today.getMonth();

    for (let month = 0; month <= totalMonths; month++) {
        const result = {
            workouts: 0,
            steps: 0,
            kilocalories: 0,
        };

        const startOfMonth = new Date(today.getFullYear(), month, 1);
        const endOfMonth = new Date(today.getFullYear(), month + 1, 0);

        for (const workout of workouts) {
            const workoutDate = new Date(workout.workoutStartedAt);

            if (workoutDate >= startOfMonth && workoutDate <= endOfMonth) {
                result.workouts += workout.duration;
                result.steps += workout.steps ?? 0;
                result.kilocalories += workout.kilocalories;
            }
        }

        labels.push(startOfMonth.toLocaleString('en-US', { month: 'long' }));
        datasets.push(result);
    }

    return {
        datasets,
        labels,
    };
};

export { generateYearlyDatasets };
