import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { FriendsApiPath } from '~/bundles/friends/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type FriendRequestDto,
    type FriendResponseDto,
    type PaginationParameters,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class FriendsApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.FRIENDS, baseUrl, http, storage });
    }

    public async getNotFollowed(payload: PaginationParameters): Promise<{
        users: FriendResponseDto[];
        query: PaginationParameters;
    }> {
        const response = await this.load(
            this.getFullEndpoint(
                `${FriendsApiPath.ROOT}?page=${payload.page}&limit=${payload.limit}`,
                {},
            ),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<{
            users: FriendResponseDto[];
            query: PaginationParameters;
        }>();
    }

    public async getFollowings(payload: PaginationParameters): Promise<{
        users: FriendResponseDto[];
        query: PaginationParameters;
    }> {
        const response = await this.load(
            this.getFullEndpoint(
                `${FriendsApiPath.FOLLOWINGS}?page=${payload.page}&limit=${payload.limit}`,
                {},
            ),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<{
            users: FriendResponseDto[];
            query: PaginationParameters;
        }>();
    }

    public async addFollowing(
        payload: FriendRequestDto,
    ): Promise<FriendResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(FriendsApiPath.FOLLOWINGS, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<FriendResponseDto>();
    }

    public async removeFollowing(payload: FriendRequestDto): Promise<number> {
        const response = await this.load(
            this.getFullEndpoint(FriendsApiPath.FOLLOWINGS, {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<number>();
    }

    public async loadMore(payload: PaginationParameters): Promise<{
        users: FriendResponseDto[];
        query: PaginationParameters;
    }> {
        const response = await this.load(
            this.getFullEndpoint(
                `${payload.path}?page=${payload.page}&limit=${payload.limit}`,
                {},
            ),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<{
            users: FriendResponseDto[];
            query: PaginationParameters;
        }>();
    }
}

export { FriendsApi };
