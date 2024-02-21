import {
    type OAuthRepository,
    OAuthEntity,
    OAuthService,
    Providers,
} from '~/bundles/connections/oauth/oauth.js';
import { type UserService } from '~/bundles/users/users.js';

import { type StravaOAuthResponseDto } from './types/types.js';

class StravaService extends OAuthService {
    private userService: UserService;

    public constructor(
        oAuthRepository: OAuthRepository,
        userService: UserService,
    ) {
        super(oAuthRepository);
        this.userService = userService;
    }

    // I need a functionality to retrieve a user from token to create/delete/update an oAuthInfo instance
    public create(payload: StravaOAuthResponseDto): Promise<unknown> {
        const mockScope = 'scope';

        const oAuthEntity = OAuthEntity.initializeNew({
            ...payload,
            scope: mockScope,
            provider: Providers.STRAVA,
        });
        const oAuthObject = oAuthEntity.toNewObject();

        return Promise.resolve(oAuthObject);
    }
}

export { StravaService };
