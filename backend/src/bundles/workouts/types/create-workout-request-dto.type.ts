import { type WorkoutRequestDto } from 'shared';

type CreateWorkoutRequestDto = WorkoutRequestDto & {
    userId: number;
};
export { type CreateWorkoutRequestDto };
