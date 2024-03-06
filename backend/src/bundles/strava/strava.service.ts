import  {
    type OAuthRepository } from '~/bundles/oauth/oauth.js';
import {
    oAuthService,
} from '~/bundles/oauth/oauth.js';
import { type WorkoutService } from '~/bundles/workouts/workout.service.js';

import { STRAVA_ACTIVITIES_URL, StravaAspect, StravaObjectType } from './constants/constants.js';
import { formatStravaResponse } from './helpers/helpers.js';
import { type StravaWebhookResponseDto } from './types/types.js';

class StravaService {
    private workoutService: WorkoutService;
    private oAuthRepository: OAuthRepository;
    public constructor(workoutService: WorkoutService, oAuthRepository: OAuthRepository) {
        this.workoutService = workoutService;
        this.oAuthRepository = oAuthRepository;
    }

    public async setWebhookData({ object_id, owner_id ,aspect_type,object_type }: StravaWebhookResponseDto): Promise<void> {
        if (object_type !== StravaObjectType.ACTIVITY) {
            return;
        }

        const authInfo = await this.oAuthRepository.find({ ownerId: owner_id });
        if (!authInfo) {
            return;
        }
        const isTokenInvalid = oAuthService.checkAccessToken(authInfo);
        const { provider, userId ,accessToken,tokenType } = authInfo.toObject();
        const token = isTokenInvalid ? await oAuthService.getAccessToken(provider, userId) : accessToken;
        if (!token) {
            return;
        }
        const response = await fetch(`${STRAVA_ACTIVITIES_URL}/${object_id}`, {
            headers: {
                'Authorization': `${tokenType} ${token}`
            }
        });
        if (!response.ok) {
            return;
        }
        const activityInfo = await response.json();
        const formattedActivityInfo = formatStravaResponse(activityInfo);

        if (!formattedActivityInfo) {
            return;
        }
        const workout = await this.workoutService.find(
            { workoutStartedAt: formattedActivityInfo.workoutStartedAt }
        );

        switch (aspect_type) {
            case StravaAspect.CREATE: {

                if (workout) {
                    break;
                }

                await this.workoutService.create({ ...formattedActivityInfo, userId });
                break;
            }
            case StravaAspect.UPDATE: {
                await this.workoutService.update({ id: workout.id }, { ...formattedActivityInfo, userId });
                break;
            }
            case StravaAspect.DELETE: {
                await this.workoutService.delete({ id: workout.id });
                break;
            }
        }
    }
}

export { StravaService };
