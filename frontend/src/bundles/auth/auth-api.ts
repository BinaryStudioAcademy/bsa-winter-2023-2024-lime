import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import {
    type UserAuthSignInRequestDto,
    type UserAuthSignUpRequestDto,
} from '~/bundles/users/users.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type AuthResponseDto,
    type IdentityAuthTokenDto,
    type RedirectUrlResponseDto,
} from './auth.js';
import { AuthApiPath, IdentityActionsPath } from './enums/enums.js';
import { type IdentityAuthorizeDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class AuthApi extends BaseHttpApi {
    private authPath: string;

    private identityPath: string;

    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: '', baseUrl, http, storage });

        this.authPath = ApiPath.AUTH;
        this.identityPath = ApiPath.IDENTITY;
    }

    public async signUp(
        payload: UserAuthSignUpRequestDto,
    ): Promise<AuthResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(this.authPath, AuthApiPath.SIGN_UP, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<AuthResponseDto>();
    }
    public async signIn(
        payload: UserAuthSignInRequestDto,
    ): Promise<AuthResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(this.authPath, AuthApiPath.SIGN_IN, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<AuthResponseDto>();
    }

    public async authorizeIdentity(
        payload: IdentityAuthorizeDto,
    ): Promise<void> {
        const { provider, referralCode } = payload;
        const response = await this.load(
            this.getFullEndpoint(
                this.identityPath,
                IdentityActionsPath.$PROVIDER_AUTHORIZE,
                { provider },
            ),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
                query: { referralCode },
            },
        );

        const { redirectUrl } = await response.json<RedirectUrlResponseDto>();

        window.location.href = redirectUrl;
    }

    public async signInIdentity(
        payload: IdentityAuthTokenDto,
    ): Promise<AuthResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(this.authPath, AuthApiPath.IDENTITY, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<AuthResponseDto>();
    }

    public async logout(): Promise<void> {
        await this.load(this.getFullEndpoint(AuthApiPath.LOGOUT, {}), {
            method: 'GET',
            hasAuth: true,
            contentType: ContentType.JSON,
        });
    }
}

export { AuthApi };
