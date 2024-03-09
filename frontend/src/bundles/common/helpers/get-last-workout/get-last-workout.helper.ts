import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

const getLastWorkout = (
    workouts: WorkoutResponseDto[],
): WorkoutResponseDto | null => {
    if (!workouts || workouts.length === 0) {
        return null;
    }
    const sortedWorkouts = [...workouts].sort((a, b) => {
        return (
            new Date(b.workoutStartedAt).getTime() -
            new Date(a.workoutStartedAt).getTime()
        );
    });

    const lastWorkout = sortedWorkouts[0];
    if (!lastWorkout) {
        return null;
    }
    return lastWorkout;
};

export { getLastWorkout };
