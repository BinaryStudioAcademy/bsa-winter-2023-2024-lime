import { type StravaActivityResponseDto, type WorkoutResponseDto } from '../types/types.js';

const formatStravaResponse = (
    {
        average_speed,
        start_date,
        distance
    }: StravaActivityResponseDto
): Omit<WorkoutResponseDto, 'id'> => {
    return {
        speed: average_speed,
        workoutStartedAt: start_date,
        distance,
    };
};

export { formatStravaResponse };
