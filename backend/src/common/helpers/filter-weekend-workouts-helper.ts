import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

const SUNDAY_INDEX = 0;
const SATURDAY_INDEX = 6;

function filterWeekendWorkouts(
    workouts: WorkoutResponseDto[],
): WorkoutResponseDto[] {
    return workouts.filter(
        (workout) =>
            (workout.workoutEndedAt as Date).getDay() === SUNDAY_INDEX ||
            (workout.workoutEndedAt as Date).getDay() === SATURDAY_INDEX,
    );
}

export { filterWeekendWorkouts };
