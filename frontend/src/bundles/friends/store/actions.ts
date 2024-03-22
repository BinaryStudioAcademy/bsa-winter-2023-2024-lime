import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type FriendRequestDto,
    type FriendResponseDto,
    type Paged,
    type PaginationParameters,
} from '~/bundles/friends/types/types.js';

import { name as sliceName } from './slice.js';

const getNotFollowed = createAsyncThunk<
    Paged<FriendResponseDto>,
    PaginationParameters,
    AsyncThunkConfig
>(`${sliceName}/get-not-followed`, async (paginationPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.getNotFollowed(paginationPayload);
});

const getFollowings = createAsyncThunk<
    Paged<FriendResponseDto>,
    PaginationParameters,
    AsyncThunkConfig
>(`${sliceName}/get-followings`, async (paginationPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.getFollowings(paginationPayload);
});

const getFollowers = createAsyncThunk<
    Paged<FriendResponseDto>,
    PaginationParameters,
    AsyncThunkConfig
>(`${sliceName}/get-followers`, async (paginationPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.getFollowers(paginationPayload);
});

const addFollowing = createAsyncThunk<
    FriendResponseDto[],
    FriendRequestDto,
    AsyncThunkConfig
>(`${sliceName}/add-following`, async (addFollowingPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.addFollowing(addFollowingPayload);
});

const removeFollowing = createAsyncThunk<
    FriendResponseDto[],
    FriendRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/remove-following`,
    async (removeFollowingPayload, { extra }) => {
        const { friendsApi } = extra;
        return await friendsApi.removeFollowing(removeFollowingPayload);
    },
);

const loadMoreFollowings = createAsyncThunk<
    Paged<FriendResponseDto>,
    PaginationParameters,
    AsyncThunkConfig
>(`${sliceName}/load-more-followings`, async (paginationPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.getFollowings(paginationPayload);
});

const loadMoreNotFollowed = createAsyncThunk<
    Paged<FriendResponseDto>,
    PaginationParameters,
    AsyncThunkConfig
>(
    `${sliceName}/load-more-not-followed`,
    async (paginationPayload, { extra }) => {
        const { friendsApi } = extra;
        return await friendsApi.getNotFollowed(paginationPayload);
    },
);

const loadMoreFollowers = createAsyncThunk<
    Paged<FriendResponseDto>,
    PaginationParameters,
    AsyncThunkConfig
>(`${sliceName}/load-more-followers`, async (paginationPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.getFollowers(paginationPayload);
});

const addFollowingFollower = createAsyncThunk<
    FriendResponseDto[],
    FriendRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/add-following-follower`,
    async (addFollowingPayload, { extra }) => {
        const { friendsApi } = extra;
        return await friendsApi.addFollowing(addFollowingPayload);
    },
);

const removeFollowingFollower = createAsyncThunk<
    FriendResponseDto[],
    FriendRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/remove-following-follower`,
    async (removeFollowingPayload, { extra }) => {
        const { friendsApi } = extra;
        return await friendsApi.removeFollowing(removeFollowingPayload);
    },
);

export {
    addFollowing,
    addFollowingFollower,
    getFollowers,
    getFollowings,
    getNotFollowed,
    loadMoreFollowers,
    loadMoreFollowings,
    loadMoreNotFollowed,
    removeFollowing,
    removeFollowingFollower,
};
