/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { colorsBarChartProgress as colors } from '~/bundles/overview/components/chart-goal-progress/enums/enums.js';
import {
    type ValueOf,
    type WorkoutResponseDto,
    WorkoutShowLastType,
} from '~/bundles/overview/overview.js';

import { type BarChartData } from '../../charts/types/bar-chart-data.types.js';

const defaultValue = 1;

const convertStatsToPercentage = (datasets: any[]) => {
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

const generateChartStats = (
    type: ValueOf<typeof WorkoutShowLastType>,
    workouts: WorkoutResponseDto[],
): BarChartData => {
    const chartData: BarChartData = {
        labels: [],
        datasets: [
            {
                label: 'Workout',
                data: [],
                backgroundColor: colors.WORKOUT.backgroundColor,

                borderColor: 'transparent',
            },
            {
                label: 'Calories',
                data: [],
                backgroundColor: colors.CALORIES.backgroundColor,

                borderColor: 'transparent',
            },
            {
                label: 'Steps',
                data: [],
                backgroundColor: colors.STEPS.backgroundColor,

                borderColor: 'transparent',
            },
        ],
    };

    const today = new Date();
    const datasets = [];

    switch (type) {
        case WorkoutShowLastType.WEEK: {
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
                            .split('T')[0] ===
                        workoutDate.toISOString().split('T')[0]
                    ) {
                        result.workouts += workout.duration;
                        result.steps += workout.steps ?? 0;
                        result.kilocalories += workout.kilocalories;
                    }
                }

                chartData.labels.push(
                    workoutDate.toLocaleString('en-US', { weekday: 'long' }),
                );
                datasets.push(result);
            }

            break;
        }
        case WorkoutShowLastType.MONTH: {
            const firstDayOfMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                1,
            );

            const daysInFirstWeek = 7 - (firstDayOfMonth.getDay() || 7);
            const totalWeeks =
                Math.ceil((today.getDate() - daysInFirstWeek) / 7) + 1;

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
                    if (
                        workoutDate >= startOfWeek &&
                        workoutDate <= endOfWeek
                    ) {
                        result.workouts += workout.duration;
                        result.steps += workout.steps ?? 0;
                        result.kilocalories += workout.kilocalories;
                    }
                }

                chartData.labels.push(`Week ${week}`);
                datasets.push(result);
            }

            break;
        }
        case WorkoutShowLastType.YEAR: {
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

                    if (
                        workoutDate >= startOfMonth &&
                        workoutDate <= endOfMonth
                    ) {
                        result.workouts += workout.duration;
                        result.steps += workout.steps ?? 0;
                        result.kilocalories += workout.kilocalories;
                    }
                }

                chartData.labels.push(
                    startOfMonth.toLocaleString('en-US', { month: 'long' }),
                );
                datasets.push(result);
            }

            break;
        }
    }

    const datasetsInPercentage = convertStatsToPercentage(datasets);

    for (const data of datasetsInPercentage) {
        chartData.datasets[0]?.data.push(data.workouts);
        chartData.datasets[1]?.data.push(data.kilocalories);
        chartData.datasets[2]?.data.push(data.steps);
    }

    return chartData;
};

export { generateChartStats };
