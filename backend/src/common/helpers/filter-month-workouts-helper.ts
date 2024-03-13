import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

function filterMonthWorkouts(
    workouts: WorkoutResponseDto[],
): WorkoutResponseDto[] {
    return workouts.filter(
        (workout) =>
            (workout.workoutEndedAt as Date).getMonth() ===
            new Date().getMonth(),
    );
}

export { filterMonthWorkouts };
