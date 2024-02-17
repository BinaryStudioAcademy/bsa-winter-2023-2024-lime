import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import {
    type PasswordForgotRequestDto,
    type PasswordForgotResponseDto,
} from '~/bundles/password-reset/types/types.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { PasswordResetApiPath } from './enums/enums.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class PasswordResetApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.AUTH, baseUrl, http, storage });
    }

    public async forgotPassword(
        payload: PasswordForgotRequestDto,
    ): Promise<PasswordForgotResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(PasswordResetApiPath.FORGOT_PASSWORD, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<PasswordForgotResponseDto>();
    }
}

export { PasswordResetApi };
