import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { FriendsApiPath } from '~/bundles/friends/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type FriendRequestDto,
    type FriendResponseDto,
    type Paged,
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

    public async getNotFollowed(
        payload: PaginationParameters,
    ): Promise<Paged<FriendResponseDto>> {
        const { page, limit } = payload;
        const response = await this.load(
            this.getFullEndpoint(FriendsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
                query: { page, limit },
            },
        );

        return await response.json<Paged<FriendResponseDto>>();
    }

    public async getFollowings(
        payload: PaginationParameters,
    ): Promise<Paged<FriendResponseDto>> {
        const { page, limit } = payload;
        const response = await this.load(
            this.getFullEndpoint(FriendsApiPath.FOLLOWINGS, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
                query: {
                    page,
                    limit,
                },
            },
        );

        return await response.json<Paged<FriendResponseDto>>();
    }

    public async getFollowers(
        payload: PaginationParameters,
    ): Promise<Paged<FriendResponseDto>> {
        const { page, limit } = payload;
        const response = await this.load(
            this.getFullEndpoint(FriendsApiPath.FOLLOWERS, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
                query: {
                    page,
                    limit,
                },
            },
        );

        return await response.json<Paged<FriendResponseDto>>();
    }

    public async addFollowing(
        payload: FriendRequestDto,
    ): Promise<FriendResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(FriendsApiPath.FOLLOWINGS, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<FriendResponseDto[]>();
    }

    public async removeFollowing(
        payload: FriendRequestDto,
    ): Promise<FriendResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(FriendsApiPath.FOLLOWINGS, {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<FriendResponseDto[]>();
    }
}

export { FriendsApi };
