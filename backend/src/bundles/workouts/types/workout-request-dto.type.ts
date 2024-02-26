import { type WorkoutRequestDto as GlobalWorkoutRequestDto } from 'shared';

type WorkoutRequestDto = GlobalWorkoutRequestDto & {
    userId: number;
};

export { type WorkoutRequestDto };
