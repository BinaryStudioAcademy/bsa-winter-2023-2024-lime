import { type WorkoutRequestDto } from './workout-request-dto.type.js';

type CreateWorkoutRequestDto = Omit<
    WorkoutRequestDto,
    'duration' | 'kilocalories' | 'steps'
>;

export { type CreateWorkoutRequestDto };
