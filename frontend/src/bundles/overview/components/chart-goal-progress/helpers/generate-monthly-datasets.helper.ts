import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

import { type ChartGoalDataset } from '../types/chart-goal-dataset.type.js';

const generateMonthlyDatasets = (
    today: Date,
    workouts: WorkoutResponseDto[],
): {
    datasets: ChartGoalDataset[];
    labels: string[];
} => {
    const datasets: ChartGoalDataset[] = [];
    const labels: string[] = [];

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const daysInFirstWeek = 7 - (firstDayOfMonth.getDay() || 7);
    const totalWeeks = Math.ceil((today.getDate() - daysInFirstWeek) / 7) + 1;

    for (let week = 1; week <= totalWeeks; week++) {
        const result = {
            workouts: 0,
            steps: 0,
            kilocalories: 0,
        };

        const startOfWeek = new Date(firstDayOfMonth);
        startOfWeek.setDate(startOfWeek.getDate() + (week - 1) * 7);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        for (const workout of workouts) {
            const workoutDate = new Date(workout.workoutStartedAt);
            if (workoutDate >= startOfWeek && workoutDate <= endOfWeek) {
                result.workouts += workout.duration;
                result.steps += workout.steps ?? 0;
                result.kilocalories += workout.kilocalories;
            }
        }

        labels.push(`Week ${week}`);
        datasets.push(result);
    }

    return {
        datasets,
        labels,
    };
};

export { generateMonthlyDatasets };
