import { type ActivityType } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';
import { type OAuthProvider } from '../../oauth/oauth.js';

type WorkoutResponseDto = {
    id: number;
    activityType: ValueOf<typeof ActivityType>;
    workoutStartedAt: Date;
    workoutEndedAt: Date | null;
    speed: number;
    duration: number;
    distance: number;
    heartRate: number | null;
    steps?: number;
    kilocalories: number;
    provider: ValueOf<typeof OAuthProvider> | null;
};

export { type WorkoutResponseDto };
