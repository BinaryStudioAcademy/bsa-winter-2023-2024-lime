import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { FileApiPath, UsersApiPath } from './enums/enums.js';
import {
    type UserAuthResponseDto,
    type UserGetAllResponseDto,
    type UserUpdateProfileRequestDto,
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
        payload: UserUpdateProfileRequestDto,
    ): Promise<UserAuthResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.UPDATE_USER, {}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<UserAuthResponseDto>();
    }

    public async upload(payload: File): Promise<string> {
        const imageData = new FormData();
        imageData.append('image', payload);
        const response = await this.load(
            this.getFullEndpoint(FileApiPath.UPLOAD, {}),
            {
                method: 'POST',
                contentType: ContentType.FORM_DATA,
                payload: imageData,
                hasAuth: true,
            },
        );

        return response.json<string>();
    }
}

export { UserApi };
