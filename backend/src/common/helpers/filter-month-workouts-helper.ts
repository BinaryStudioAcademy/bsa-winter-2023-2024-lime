import { type WorkoutResponseDto } from 'shared';

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
