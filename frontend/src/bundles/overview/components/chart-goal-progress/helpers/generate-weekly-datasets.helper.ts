import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

import { type ChartGoalDataset } from '../types/chart-goal-dataset.type.js';

const generateWeeklyDatasets = (
    today: Date,
    workouts: WorkoutResponseDto[],
): {
    datasets: ChartGoalDataset[];
    labels: string[];
} => {
    const datasets: ChartGoalDataset[] = [];
    const labels: string[] = [];
    for (let index = today.getDay(); index > 0; index--) {
        const workoutDate = new Date(
            new Date().setDate(today.getDate() - index + 1),
        );

        const result = {
            workouts: 0,
            steps: 0,
            kilocalories: 0,
        };

        for (const workout of workouts) {
            if (
                new Date(workout.workoutStartedAt)
                    .toISOString()
                    .split('T')[0] === workoutDate.toISOString().split('T')[0]
            ) {
                result.workouts += workout.duration;
                result.steps += workout.steps ?? 0;
                result.kilocalories += workout.kilocalories;
            }
        }

        labels.push(workoutDate.toLocaleString('en-US', { weekday: 'long' }));
        datasets.push(result);
    }
    return {
        datasets,
        labels,
    };
};

export { generateWeeklyDatasets };
