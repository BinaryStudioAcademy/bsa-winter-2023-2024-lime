import { type WorkoutRequestDto as MainWorkoutRequestDto } from 'shared';

type WorkoutRequestDto = MainWorkoutRequestDto & {
    userId: number;
};
export { type WorkoutRequestDto };
