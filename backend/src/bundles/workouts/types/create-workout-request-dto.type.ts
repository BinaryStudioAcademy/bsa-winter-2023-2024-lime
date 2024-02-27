import { type WorkoutRequestDto } from 'shared';

type CreateWorkoutRequestDto = Pick<WorkoutRequestDto, 'activity'> & {
    userId: number;
};
export { type CreateWorkoutRequestDto };
