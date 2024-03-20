import { type WorkoutResponseDto } from '../types/types.js';

const formatWorkoutDataDate = (workoutData: WorkoutResponseDto[]): WorkoutResponseDto[] => {
    return workoutData.map((workout) => {
        const date = new Date(workout.workoutStartedAt);       
        return { ...workout, workoutStartedAt: date };
    });
};

export { formatWorkoutDataDate };