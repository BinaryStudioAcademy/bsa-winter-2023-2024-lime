import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

const calculateStats = (
    workouts: WorkoutResponseDto[],
): {
    workouts: number;
    steps: number;
    kilocalories: number;
} => {
    const SECONDS_IN_HOUR = 3600;
    const result = {
        workouts: 0,
        steps: 0,
        kilocalories: 0,
    };

    for (const workout of workouts) {
        result.workouts += workout.duration / SECONDS_IN_HOUR;
        result.steps += workout.steps ?? 0;
        result.kilocalories += workout.kilocalories;
    }

    result.workouts = Number(result.workouts.toFixed(1));
    return result;
};

export { calculateStats };
