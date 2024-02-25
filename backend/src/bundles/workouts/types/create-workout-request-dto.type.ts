import { type WorkoutRequestDto } from 'shared';

type CreateWorkoutRequestDto = Omit<
    WorkoutRequestDto,
    'duration' | 'kilocalories' | 'steps'
> & {
    userId: number;
};
export { type CreateWorkoutRequestDto };
