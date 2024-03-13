import { type WorkoutResponseDto } from 'shared';

function calculateTotalDuration(workouts: WorkoutResponseDto[]): number {
    return workouts.reduce(
        (accumulator, workout) => accumulator + workout.duration,
        0,
    );
}

export { calculateTotalDuration };
