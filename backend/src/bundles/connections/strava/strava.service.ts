import {
    OAuthEntity,
    OAuthService,
    Providers,
} from '~/bundles/connections/oauth/oauth.js';

import { type StravaOAuthResponseDto } from './types/types.js';

class StravaService extends OAuthService {
    public async create(payload: StravaOAuthResponseDto): Promise<unknown> {
        const mockScope = 'scope';

        const oAuthEntity = OAuthEntity.initializeNew({
            ...payload,
            scope: mockScope,
            provider: Providers.STRAVA,
        });

        const oAuthInfo = await this.oAuthRepository.create(oAuthEntity);

        return oAuthInfo.toObject();
    }
}

export { StravaService };
