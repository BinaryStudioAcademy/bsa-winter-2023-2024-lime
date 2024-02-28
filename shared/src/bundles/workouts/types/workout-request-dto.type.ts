import { type ActivityType } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';

type WorkoutRequestDto = {
    activity: ValueOf<typeof ActivityType>;
    workoutStartedAt: Date;
    workoutEndedAt: Date;
    speed: number;
    distance: number;
    heartRate: number;
    steps?: number;
    kilocalories: number;
};

export { type WorkoutRequestDto };
