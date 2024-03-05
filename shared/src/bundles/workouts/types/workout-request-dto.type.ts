import { type ActivityType } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';

type WorkoutRequestDto = {
    activityType: ValueOf<typeof ActivityType>;
    workoutStartedAt: Date;
    workoutEndedAt: Date;
    speed: number;
    distance: number;
    heartRate: number | null;
    steps?: number;
    kilocalories: number;
};

export { type WorkoutRequestDto };
