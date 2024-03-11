import { google } from 'googleapis';

import {
    GOOGLE_FIT_ACCESS_TYPE,
    GOOGLE_FIT_API_URL,
    READ_SCOPE,
    WRITE_SCOPE,
} from '~/bundles/google-fit/constants/constants.js';
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
import { type Config } from '~/common/config/config.js';

import { ApiPath } from './enums/enums.js';

class GoogleFitOAuthStrategy implements OAuthStrategy {
    private config: Config;
    private OAuth2;

    public constructor(config: Config) {
        this.config = config;
        this.OAuth2 = new google.auth.OAuth2(
            this.config.ENV.GOOGLE_FIT.CLIENT_ID,
            this.config.ENV.GOOGLE_FIT.CLIENT_SECRET,
            `${this.config.ENV.APP.API_BASE_URL}${ApiPath.OAUTH}/${OAuthProvider.GOOGLE_FIT}${OAuthActionsPath.EXCHANGE_TOKEN}`,
        );
    }

    public getAuthorizeRedirectUrl(oAuthStateEntity: OAuthStateEntity): URL {
        const { userId, uuid } = oAuthStateEntity.toObject();
        const url = this.OAuth2.generateAuthUrl({
            access_type: GOOGLE_FIT_ACCESS_TYPE,
            scope: [
                `${GOOGLE_FIT_API_URL}${READ_SCOPE}`,
                `${GOOGLE_FIT_API_URL}${WRITE_SCOPE}`,
                'https://www.googleapis.com/auth/fitness.heart_rate.read',
                'https://www.googleapis.com/auth/fitness.location.read',
            ],
            state: JSON.stringify({ userId, uuid }),
        });
        return new URL(url);
    }

    public async exchangeAuthCode(
        payload: OAuthExchangeAuthCodeDto,
    ): Promise<OAuthEntity> {
        const { code, scope, userId } = payload;
        const {
            res,
            tokens: { access_token, refresh_token, token_type, expiry_date },
        } = await this.OAuth2.getToken(code);

        if (res?.status !== HttpCode.OK) {
            throw new HttpError({
                message: ErrorMessage.INVALID_PARAMS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        return OAuthEntity.initializeNew({
            userId,
            tokenType: token_type as string,
            scope,
            provider: OAuthProvider.GOOGLE_FIT,
            accessToken: access_token as string,
            expiresAt: expiry_date as number,
            refreshToken: refresh_token as string,
        });
    }

    public checkScope(scope: string | null): boolean {
        if (!scope) {
            return false;
        }
        return scope.includes(WRITE_SCOPE && READ_SCOPE);
    }

    public async exchangeRefreshToken(
        oAuthEntity: OAuthEntity,
    ): Promise<OAuthEntity> {
        const { userId, refreshToken, scope } = oAuthEntity.toObject();
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
            provider: OAuthProvider.GOOGLE_FIT,
            expiresAt: expiry_date as number,
            accessToken: access_token as string,
            tokenType: token_type as string,
            refreshToken: refresh_token as string,
            scope,
            userId,
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

export { GoogleFitOAuthStrategy };
