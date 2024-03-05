import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { UsersApiPath } from './enums/enums.js';
import {
    type UserAuthResponseDto,
    type UserGetAllResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class UserApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USERS, baseUrl, http, storage });
    }

    public async getAll(): Promise<UserGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<UserGetAllResponseDto>();
    }

    public async refreshUser(): Promise<UserAuthResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.CURRENT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<UserAuthResponseDto>();
    }

    public async updateUser(
        userId: string,
        payload: FormData,
    ): Promise<UserAuthResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.UPDATE_USER, `/${userId}`, {}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: payload,
                hasAuth: true,
            },
        );

        return await response.json<UserAuthResponseDto>();
    }
}

export { UserApi };
