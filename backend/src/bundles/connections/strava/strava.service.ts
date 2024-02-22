import {
    OAuthEntity,
    OAuthService,
    Providers,
} from '~/bundles/connections/oauth/oauth.js';

import { type StravaOAuthResponseDto } from './types/types.js';

class StravaService extends OAuthService {
    public async create(payload: StravaOAuthResponseDto): Promise<unknown> {
        const oAuthEntity = OAuthEntity.initializeNew({
            ...payload,
            provider: Providers.STRAVA,
        });

        const oAuthInfo = await this.oAuthRepository.create(oAuthEntity);

        return oAuthInfo.toObject();
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return await this.oAuthRepository.delete({
            ...query,
            provider: Providers.STRAVA,
        });
    }
}

export { StravaService };
