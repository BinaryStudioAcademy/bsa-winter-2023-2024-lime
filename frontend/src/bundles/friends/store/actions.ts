import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserFriendsRequestDto,
    type UserFriendsResponseDto,
} from '~/bundles/friends/types/types.js';

import { name as sliceName } from './slice.js';

const getFriends = createAsyncThunk<
    UserFriendsResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-friends`, async (_, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.getFriends();
});

const addFriend = createAsyncThunk<
    UserFriendsResponseDto,
    UserFriendsRequestDto,
    AsyncThunkConfig
>(`${sliceName}/add-friend`, async (addFriendPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.addFriend(addFriendPayload);
});

const removeFriend = createAsyncThunk<
    number,
    UserFriendsRequestDto,
    AsyncThunkConfig
>(`${sliceName}/remove-friend`, async (removeFriendPayload, { extra }) => {
    const { friendsApi } = extra;
    return await friendsApi.removeFriend(removeFriendPayload);
});

export { addFriend, getFriends, removeFriend };
