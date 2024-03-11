import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type UserAuthRequestDto } from '~/bundles/users/users.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type AuthResponseDto } from './auth.js';
import { AuthApiPath } from './enums/enums.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class AuthApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.AUTH, baseUrl, http, storage });
    }

    public async signUp(
        referralCode: string | null,
        payload: UserAuthRequestDto,
    ): Promise<AuthResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
                query: { referralCode: referralCode ?? '' },
            },
        );

        return await response.json<AuthResponseDto>();
    }
    public async signIn(payload: UserAuthRequestDto): Promise<AuthResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
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
