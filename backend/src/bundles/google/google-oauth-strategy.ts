import { google } from 'googleapis';
import { decodeJwt } from 'jose';

import {
    GOOGLE_ACCESS_TYPE,
    GOOGLE_API_URL,
    GOOGLE_EMAIL_SCOPE,
    GOOGLE_OPENID_SCOPE,
    GOOGLE_PROFILE_SCOPE,
} from '~/bundles/google/constants/constants.js';
import {
    type OAuthExchangeAuthCodeDto,
    type OAuthStateEntity,
    type OAuthStrategy,
    ErrorMessage,
    HttpCode,
    HttpError,
    OAuthEntity,
} from '~/bundles/oauth/oauth.js';
import { OAuthActionsPath, OAuthProvider } from '~/bundles/oauth/oauth.js';
import { userService } from '~/bundles/users/users.js';
import { type Config } from '~/common/config/config.js';

import { ApiPath } from './enums/enums.js';
import { type GoogleOAuthIdTokenDto } from './types/google-oauth-id-token-dto.type.js';

class GoogleOAuthStrategy implements OAuthStrategy {
    private config: Config;
    private OAuth2;

    public constructor(config: Config) {
        this.config = config;
        this.OAuth2 = new google.auth.OAuth2(
            this.config.ENV.GOOGLE.CLIENT_ID,
            this.config.ENV.GOOGLE.CLIENT_SECRET,
            `${this.config.ENV.APP.API_BASE_URL}${ApiPath.OAUTH}/${OAuthProvider.GOOGLE}${OAuthActionsPath.EXCHANGE_TOKEN}`,
        );
    }

    public getAuthorizeRedirectUrl(oAuthStateEntity: OAuthStateEntity): URL {
        const { uuid, type, userId } = oAuthStateEntity.toObject();
        const url = this.OAuth2.generateAuthUrl({
            access_type: GOOGLE_ACCESS_TYPE,
            scope: [
                `${GOOGLE_OPENID_SCOPE}`,
                `${GOOGLE_API_URL}${GOOGLE_EMAIL_SCOPE}`,
                `${GOOGLE_API_URL}${GOOGLE_PROFILE_SCOPE}`,
            ],
            state: JSON.stringify({ uuid, type, userId }),
        });
        return new URL(url);
    }

    public async exchangeAuthCode(
        payload: OAuthExchangeAuthCodeDto,
    ): Promise<OAuthEntity> {
        const { code, scope } = payload;
        const {
            res,
            tokens: {
                id_token,
                access_token,
                refresh_token,
                token_type,
                expiry_date,
            },
        } = await this.OAuth2.getToken(code);

        if (res?.status !== HttpCode.OK) {
            throw new HttpError({
                message: ErrorMessage.INVALID_PARAMS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        if (!id_token) {
            throw new HttpError({
                message: ErrorMessage.INVALID_PARAMS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const userInfo: GoogleOAuthIdTokenDto = decodeJwt(id_token);

        const { id: userId } = await userService.findOrCreateOAuthUser({
            email: userInfo.email,
            fullName: userInfo.name,
            avatarUrl: userInfo.picture,
        });

        return OAuthEntity.initializeNew({
            userId,
            tokenType: token_type as string,
            scope,
            provider: OAuthProvider.GOOGLE,
            accessToken: access_token as string,
            expiresAt: expiry_date as number,
            refreshToken: refresh_token as string,
            type: payload.type,
        });
    }

    public checkScope(scope: string | null): boolean {
        if (!scope) {
            return false;
        }
        return scope.includes(GOOGLE_OPENID_SCOPE);
    }

    public async exchangeRefreshToken(
        oAuthEntity: OAuthEntity,
    ): Promise<OAuthEntity> {
        const { userId, refreshToken, scope, type } = oAuthEntity.toObject();
        this.OAuth2.setCredentials({
            refresh_token: refreshToken,
        });

        const {
            res,
            credentials: {
                refresh_token,
                token_type,
                expiry_date,
                access_token,
            },
        } = await this.OAuth2.refreshAccessToken();

        if (res?.status !== HttpCode.OK) {
            throw new HttpError({
                status: HttpCode.FORBIDDEN,
                message: ErrorMessage.UNVERIFIED,
            });
        }

        return OAuthEntity.initializeNew({
            provider: OAuthProvider.GOOGLE,
            expiresAt: expiry_date as number,
            accessToken: access_token as string,
            tokenType: token_type as string,
            refreshToken: refresh_token as string,
            scope,
            userId,
            type,
        });
    }

    public async deauthorize(oAuthEntity: OAuthEntity): Promise<void> {
        const { refreshToken } = oAuthEntity.toObject();
        const { status } = await this.OAuth2.revokeToken(refreshToken);

        if (status !== HttpCode.OK) {
            throw new HttpError({
                status: HttpCode.FORBIDDEN,
                message: ErrorMessage.UNVERIFIED,
            });
        }
    }
}

export { GoogleOAuthStrategy };
