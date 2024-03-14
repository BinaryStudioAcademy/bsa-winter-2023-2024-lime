import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type PaginationParameters,
    type UserFollowingsRequestDto,
    type UserFollowingsResponseDto,
} from '~/bundles/friends/types/types.js';

import { name as sliceName } from './slice.js';

const getNotFollowed = createAsyncThunk<
    { users: UserFollowingsResponseDto[]; query: PaginationParameters },
    PaginationParameters,
    AsyncThunkConfig
>(`${sliceName}/get-not-followed`, async (paginationPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.getNotFollowed(paginationPayload);
});

const getFollowings = createAsyncThunk<
    { users: UserFollowingsResponseDto[]; query: PaginationParameters },
    PaginationParameters,
    AsyncThunkConfig
>(`${sliceName}/get-followings`, async (paginationPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.getFollowings(paginationPayload);
});

const addFollowing = createAsyncThunk<
    UserFollowingsResponseDto,
    UserFollowingsRequestDto,
    AsyncThunkConfig
>(`${sliceName}/add-following`, async (addFollowingPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.addFollowing(addFollowingPayload);
});

const removeFollowing = createAsyncThunk<
    number,
    UserFollowingsRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/remove-following`,
    async (removeFollowingPayload, { extra }) => {
        const { friendsApi } = extra;
        return await friendsApi.removeFollowing(removeFollowingPayload);
    },
);

export { addFollowing, getFollowings, getNotFollowed, removeFollowing };
