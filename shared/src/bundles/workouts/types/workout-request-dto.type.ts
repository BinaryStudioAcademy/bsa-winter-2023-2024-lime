import { type ActivityType } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';
import { type OAuthProvider } from '../../oauth/oauth.js';

type WorkoutRequestDto = {
    activityType: ValueOf<typeof ActivityType>;
    workoutStartedAt: Date;
    workoutEndedAt: Date;
    speed: number;
    distance: number;
    heartRate: number | null;
    steps?: number;
    activityId?: number;
    kilocalories: number;
    provider: ValueOf<typeof OAuthProvider> | null;
};

export { type WorkoutRequestDto };
