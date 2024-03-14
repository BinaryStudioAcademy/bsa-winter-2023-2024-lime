import { google } from 'googleapis';
import { decodeJwt } from 'jose';

import {
    type IdentityExchangeAuthCodeDto,
    type IdentityStrategy,
    type OAuthStateEntity,
    ErrorMessage,
    HttpCode,
    HttpError,
    IdentityActionsPath,
    IdentityProvider,
} from '~/bundles/identity/identity.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import { userService } from '~/bundles/users/users.js';
import { type Config } from '~/common/config/config.js';

import {
    GOOGLE_ACCESS_TYPE,
    GOOGLE_API_URL,
    GOOGLE_EMAIL_SCOPE,
    GOOGLE_OPENID_SCOPE,
    GOOGLE_PROFILE_SCOPE,
} from './constants/constants.js';
import { ApiPath } from './enums/enums.js';
import { type GoogleIdTokenDto } from './types/google-id-token-dto.type.js';

class GoogleIdentityStrategy implements IdentityStrategy {
    private config: Config;
    private OAuth2;

    public constructor(config: Config) {
        this.config = config;
        this.OAuth2 = new google.auth.OAuth2(
            this.config.ENV.GOOGLE.CLIENT_ID,
            this.config.ENV.GOOGLE.CLIENT_SECRET,
            `${this.config.ENV.APP.API_BASE_URL}${ApiPath.IDENTITY}/${IdentityProvider.GOOGLE}${IdentityActionsPath.EXCHANGE_TOKEN}`,
        );
    }

    public getAuthorizeRedirectUrl(oAuthStateEntity: OAuthStateEntity): URL {
        const { uuid, referralCode } = oAuthStateEntity.toObject();
        const url = this.OAuth2.generateAuthUrl({
            access_type: GOOGLE_ACCESS_TYPE,
            scope: [
                `${GOOGLE_OPENID_SCOPE}`,
                `${GOOGLE_API_URL}${GOOGLE_EMAIL_SCOPE}`,
                `${GOOGLE_API_URL}${GOOGLE_PROFILE_SCOPE}`,
            ],
            state: JSON.stringify({ uuid, referralCode }),
        });
        return new URL(url);
    }

    public async exchangeAuthCode(
        payload: IdentityExchangeAuthCodeDto,
    ): Promise<UserAuthResponseDto> {
        const { code, referralCode } = payload;
        const {
            res,
            tokens: { id_token },
        } = await this.OAuth2.getToken(code);

        if (res?.status !== HttpCode.OK || !id_token) {
            throw new HttpError({
                message: ErrorMessage.INVALID_PARAMS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const userInfo: GoogleIdTokenDto = decodeJwt(id_token);
        return await userService.findOrCreateIdentityUser({
            email: userInfo.email,
            fullName: userInfo.name,
            avatarUrl: userInfo.picture,
            referralCode,
        });
    }

    public checkScope(scope: string | null): boolean {
        if (!scope) {
            return false;
        }
        return scope.includes(GOOGLE_OPENID_SCOPE);
    }
}

export { GoogleIdentityStrategy };
