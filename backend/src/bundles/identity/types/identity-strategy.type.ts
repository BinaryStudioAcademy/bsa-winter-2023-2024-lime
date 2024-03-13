import { type OAuthStateEntity } from '~/bundles/oauth/oauth.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';

import { type IdentityExchangeAuthCodeDto } from './identity-exchange-auth-code-dto.type.js';

type IdentityStrategy = {
    getAuthorizeRedirectUrl: (oAuthStateEntity: OAuthStateEntity) => URL;
    checkScope: (scope: string) => boolean;
    exchangeAuthCode: (
        payload: IdentityExchangeAuthCodeDto,
    ) => Promise<UserAuthResponseDto>;
};

export { type IdentityStrategy };
