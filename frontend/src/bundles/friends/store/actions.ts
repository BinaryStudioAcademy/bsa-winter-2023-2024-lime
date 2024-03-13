import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserFollowingsRequestDto,
    type UserFollowingsResponseDto,
} from '~/bundles/friends/types/types.js';

import { name as sliceName } from './slice.js';

const getFollowings = createAsyncThunk<
    UserFollowingsResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-followings`, async (_, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.getFollowings();
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

export { addFollowing, getFollowings, removeFollowing };
