import { type Activity } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';

type WorkoutResponseDto = {
    id: number;
    activity: ValueOf<typeof Activity>;
    workoutStartedAt: Date;
    workoutEndedAt: Date | null;
    speed: number;
    distance: number;
    heartRate: number;
    steps?: number;
    kilocalories: number;
};

export { type WorkoutResponseDto };
