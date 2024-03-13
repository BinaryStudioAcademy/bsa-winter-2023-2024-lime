import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { UsersApiPath } from '~/bundles/users/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type UserFollowingsRequestDto,
    type UserFollowingsResponseDto,
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
    public async getNotFollowed(): Promise<UserFollowingsResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.NOT_FOLLOWED, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<UserFollowingsResponseDto[]>();
    }

    public async getFollowings(): Promise<UserFollowingsResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.FOLLOWINGS, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<UserFollowingsResponseDto[]>();
    }

    public async addFollowing(
        payload: UserFollowingsRequestDto,
    ): Promise<UserFollowingsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.FOLLOWINGS, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<UserFollowingsResponseDto>();
    }

    public async removeFollowing(
        payload: UserFollowingsRequestDto,
    ): Promise<number> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.FOLLOWINGS, {}),
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
