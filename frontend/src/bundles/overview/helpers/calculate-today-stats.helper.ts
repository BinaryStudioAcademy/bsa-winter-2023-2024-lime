import { isToday } from 'date-fns';

import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

const calculateTodayStats = (
    workouts: WorkoutResponseDto[],
): {
    workouts: number;
    distance: number;
    kilocalories: number;
} => {
    const SECONDS_IN_HOUR = 3600;
    const METERS_IN_KILOMETER = 1000;
    const result = {
        workouts: 0,
        distance: 0,
        kilocalories: 0,
    };

    const todayWorkouts = workouts.filter((workout) =>
        isToday(new Date(workout.workoutStartedAt)),
    );

    for (const workout of todayWorkouts) {
        result.workouts += workout.duration / SECONDS_IN_HOUR;
        result.distance += workout.distance / METERS_IN_KILOMETER;
        result.kilocalories += workout.kilocalories;
    }

    result.workouts = Number(result.workouts.toFixed(2));
    return result;
};

export { calculateTodayStats };
