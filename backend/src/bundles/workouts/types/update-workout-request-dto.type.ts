import { type WorkoutRequestDto } from 'shared';

type UpdateWorkoutRequestDto = WorkoutRequestDto & {
    userId: number;
};

export { type UpdateWorkoutRequestDto };
