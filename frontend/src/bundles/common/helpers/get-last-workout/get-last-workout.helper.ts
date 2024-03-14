import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

const getLastWorkout = (
    workouts: WorkoutResponseDto[],
): WorkoutResponseDto | null => {
    if (workouts.length === 0) {
        return null;
    }

    if (workouts.length === 1) {
        return workouts[0] as WorkoutResponseDto;
    }

    const sortedWorkouts = workouts.toSorted((a, b) => {
        return (
            new Date(b.workoutStartedAt).getTime() -
            new Date(a.workoutStartedAt).getTime()
        );
    });

    return sortedWorkouts[0] as WorkoutResponseDto;
};

export { getLastWorkout };
