import  {
    type OAuthRepository } from '~/bundles/oauth/oauth.js';
import {
    oAuthService,
} from '~/bundles/oauth/oauth.js';
import { type WorkoutService } from '~/bundles/workouts/workout.service.js';

import { STRAVA_ACTIVITIES_URL } from './constants/constants.js';
import { type StravaWebhookResponseDto } from './types/types.js';

class StravaService {
    private workoutService: WorkoutService;
    private oAuthRepository: OAuthRepository;
    public constructor(workoutService: WorkoutService, oAuthRepository: OAuthRepository) {
        this.workoutService = workoutService;
        this.oAuthRepository = oAuthRepository;
    }

    public async setWebhookData({ object_id, owner_id, ...rest }: StravaWebhookResponseDto): Promise<void> {
        console.log(object_id, owner_id, rest);
        const authInfo = await this.oAuthRepository.find({ ownerId: owner_id });
        if (!authInfo) {
            console.log('return AuthInfo', authInfo);
            return;
        }
        const isTokenInvalid = oAuthService.checkAccessToken(authInfo);
        console.log('isTokenInvalid',isTokenInvalid);
        const { provider, userId ,accessToken } = authInfo.toObject();
        const token = isTokenInvalid ? await oAuthService.getAccessToken(provider, userId) : accessToken;
        if (!token) {
            return;
        }
        const response = await fetch(`${STRAVA_ACTIVITIES_URL}/${object_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.log('ret not ok');
            return;
        }
        console.log('authInfo', authInfo);
        const activityInfo = await response.json();
        console.log('activityInfo', activityInfo);
    }
}

export { StravaService };
