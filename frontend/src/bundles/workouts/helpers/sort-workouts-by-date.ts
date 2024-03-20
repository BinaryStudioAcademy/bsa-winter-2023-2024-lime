import { type WorkoutResponseDto } from '../types/types.js';

const sortWorkoutsByDate = (
    workouts: WorkoutResponseDto[],
): WorkoutResponseDto[] => {
    const workoutsCopy = [...workouts];    
    const mapAsDate = (workout: WorkoutResponseDto): Date =>
        new Date(workout.workoutStartedAt);
    return workoutsCopy.sort(
        (a: WorkoutResponseDto, b: WorkoutResponseDto): number => {
            const dateA = mapAsDate(a);
            const dateB = mapAsDate(b);
            return dateB.getTime() - dateA.getTime();
        },
    );   

};

export { sortWorkoutsByDate };
