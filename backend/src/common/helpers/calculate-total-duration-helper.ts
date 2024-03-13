import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

function calculateTotalDuration(workouts: WorkoutResponseDto[]): number {
    return workouts.reduce(
        (accumulator, workout) => accumulator + workout.duration,
        0,
    );
}

export { calculateTotalDuration };
