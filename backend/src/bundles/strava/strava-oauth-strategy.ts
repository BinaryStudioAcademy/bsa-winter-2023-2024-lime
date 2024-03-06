import {
    type OAuthExchangeAuthCodeDto,
    type OAuthStateEntity,
    type OAuthStrategy,
    ErrorMessage,
    HttpCode,
    HttpError,
    OAuthActionsPath,
    OAuthEntity,
    OAuthProvider,
} from '~/bundles/oauth/oauth.js';
import { type Config } from '~/common/config/config.js';

import { REQUIRED_SCOPE } from './constants/strava-required-scope.constant.js';
import { ApiPath, StravaPath } from './enums/enums.js';
import { type StravaOAuthResponseDto } from './types/types.js';

class StravaOAuthStrategy implements OAuthStrategy {
    private config: Config;

    public constructor(config: Config) {
        this.config = config;
    }

    public getAuthorizeRedirectUrl(oAuthStateEntity: OAuthStateEntity): URL {
        const { userId, uuid } = oAuthStateEntity.toObject();

        const redirectUri = new URL(
            `${this.config.ENV.APP.API_BASE_URL}${ApiPath.OAUTH}/${OAuthProvider.STRAVA}${OAuthActionsPath.EXCHANGE_TOKEN}`,
        );
        redirectUri.searchParams.set('userId', userId.toString());

        const url = new URL(StravaPath.AUTHORIZE);

        const searchParameters = new URLSearchParams({
            client_id: this.config.ENV.STRAVA.CLIENT_ID,
            response_type: 'code',
            redirect_uri: redirectUri.toString(),
            approval_prompt: 'force',
            scope: 'read,activity:read,activity:read_all,activity:write',
            state: uuid,
        });

        url.search = searchParameters.toString();

        return url;
    }

    public checkScope(scope: string): boolean {
        return scope.includes(REQUIRED_SCOPE);
    }

    public async exchangeAuthCode(
        payload: OAuthExchangeAuthCodeDto,
    ): Promise<OAuthEntity> {
        const { code, scope, userId } = payload;

        const url = new URL(StravaPath.TOKEN);

        const searchParameters = new URLSearchParams({
            client_id: this.config.ENV.STRAVA.CLIENT_ID,
            client_secret: this.config.ENV.STRAVA.CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
        });

        url.search = searchParameters.toString();

        const response = await fetch(url, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new HttpError({
                message: ErrorMessage.INVALID_PARAMS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const {
            token_type,
            access_token,
            expires_at,
            refresh_token,
            athlete: { id },
        }: StravaOAuthResponseDto = await response.json();

        return OAuthEntity.initializeNew({
            userId,
            ownerId: id,
            tokenType: token_type,
            accessToken: access_token,
            expiresAt: expires_at,
            refreshToken: refresh_token,
            scope,
            provider: OAuthProvider.STRAVA,
        });
    }

    public async exchangeRefreshToken(
        oAuthEntity: OAuthEntity,
    ): Promise<OAuthEntity> {
        const { userId, refreshToken, scope } = oAuthEntity.toObject();

        const url = new URL(StravaPath.REFRESH_TOKEN);

        const searchParameters = new URLSearchParams({
            client_id: this.config.ENV.STRAVA.CLIENT_ID,
            client_secret: this.config.ENV.STRAVA.CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        url.search = searchParameters.toString();

        const response = await fetch(url, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new HttpError({
                status: HttpCode.FORBIDDEN,
                message: ErrorMessage.UNVERIFIED,
            });
        }

        const {
            token_type,
            access_token,
            expires_at,
            refresh_token,
        }: StravaOAuthResponseDto = await response.json();

        return OAuthEntity.initializeNew({
            userId,
            tokenType: token_type,
            accessToken: access_token,
            expiresAt: expires_at,
            refreshToken: refresh_token,
            scope,
            provider: OAuthProvider.STRAVA,
        });
    }

    public async deauthorize(oAuthEntity: OAuthEntity): Promise<void> {
        const { accessToken } = oAuthEntity.toObject();

        const url = new URL(StravaPath.DEAUTHRORIZE);

        const searchParameters = new URLSearchParams({
            access_token: accessToken,
        });

        url.search = searchParameters.toString();

        const response = await fetch(url, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new HttpError({
                status: HttpCode.FORBIDDEN,
                message: ErrorMessage.UNVERIFIED,
            });
        }
    }
}

export { StravaOAuthStrategy };
