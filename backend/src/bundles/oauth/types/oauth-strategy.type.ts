import { type OAuthEntity } from '../oauth.entity.js';
import { type OAuthStateEntity } from '../oauth-state.entity.js';
import { type OAuthExchangeAuthCodeDto } from './oauth-exchange-auth-code-dto.type.js';

type OAuthStrategy = {
    getAuthorizeRedirectUrl: (oAuthStateEntity: OAuthStateEntity) => URL;
    checkScope: (scope: string) => boolean;
    exchangeAuthCode: (
        payload: OAuthExchangeAuthCodeDto,
    ) => Promise<OAuthEntity>;
    exchangeRefreshToken: (oAuthEntity: OAuthEntity) => Promise<OAuthEntity>;
    deauthorize: (oAuthEntity: OAuthEntity) => Promise<void>;
};

export { type OAuthStrategy };
