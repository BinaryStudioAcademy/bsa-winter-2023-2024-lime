import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { UsersApiPath } from '~/bundles/users/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type UserFriendsRequestDto,
    type UserFriendsResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class FriendsApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USERS, baseUrl, http, storage });
    }
    public async getFriends(): Promise<UserFriendsResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.FRIENDS, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<UserFriendsResponseDto[]>();
    }

    public async addFriend(
        payload: UserFriendsRequestDto,
    ): Promise<UserFriendsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.FRIENDS, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<UserFriendsResponseDto>();
    }

    public async removeFriend(payload: UserFriendsRequestDto): Promise<number> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.FRIENDS, {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<number>();
    }
}

export { FriendsApi };
