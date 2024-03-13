import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

function calculateTotalDistance(workouts: WorkoutResponseDto[]): number {
    return workouts.reduce(
        (accumulator, workout) => accumulator + workout.distance,
        0,
    );
}

export { calculateTotalDistance };
