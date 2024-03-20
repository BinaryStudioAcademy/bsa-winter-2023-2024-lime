import { type WorkoutResponseDto } from '../types/types.js';

const sortWorkoutsByDate = (
    workouts: WorkoutResponseDto[],
): WorkoutResponseDto[] => {
    return workouts.sort((a, b) => {
        return b.workoutStartedAt.getTime() - a.workoutStartedAt.getTime();
    });
};

export { sortWorkoutsByDate };
