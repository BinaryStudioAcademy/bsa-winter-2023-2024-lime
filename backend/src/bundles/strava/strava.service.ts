import {
    oAuthService,
} from '~/bundles/oauth/oauth.js';
import { type WorkoutService } from '~/bundles/workouts/workout.service.js';

import { STRAVA_ACTIVITIES_URL } from './constants/constants.js';
import { type StravaWebhookResponseDto } from './types/types.js';

class StravaService {
    private workoutService: WorkoutService;
    public constructor(workoutService: WorkoutService) {
        this.workoutService = workoutService;
    }

    public async setWebhookData({ object_id, owner_id, ...rest }: StravaWebhookResponseDto): Promise<void> {
        console.log(object_id, owner_id, rest);
        const authInfo = await oAuthService.find({ ownerId: owner_id });
        if (!authInfo) {
            return;
        }

        const { accessToken } = authInfo;

        const response = await fetch(`${STRAVA_ACTIVITIES_URL}/${object_id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            return;
        }
        console.log('authInfo', authInfo);
        console.log('response', await response.json());
    }
}

export { StravaService };
