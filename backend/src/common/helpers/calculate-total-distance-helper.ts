import { type WorkoutResponseDto } from 'shared';

function calculateTotalDistance(workouts: WorkoutResponseDto[]): number {
    return workouts.reduce(
        (accumulator, workout) => accumulator + workout.distance,
        0,
    );
}

export { calculateTotalDistance };
