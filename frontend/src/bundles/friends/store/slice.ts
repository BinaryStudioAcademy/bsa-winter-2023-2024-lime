import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type FriendResponseDto } from '../types/types.js';
import {
    addFollowing,
    getFollowings,
    getNotFollowed,
    loadMore,
    removeFollowing,
} from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    users: FriendResponseDto[];
    totalCount: number | undefined;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    users: [],
    totalCount: 0,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'followings',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getNotFollowed.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getNotFollowed.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.users = action.payload.users;
            state.totalCount = action.payload.query.totalCount ?? 0;
        });
        builder.addCase(getNotFollowed.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(getFollowings.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getFollowings.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.users = action.payload.users;
            state.totalCount = action.payload.query.totalCount ?? 0;
        });
        builder.addCase(getFollowings.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(addFollowing.fulfilled, (state, action) => {
            state.totalCount && (state.totalCount -= 1);
            state.users = [
                ...state.users.filter(
                    (following) =>
                        following.userId !== action.meta.arg.followingId,
                ),
                ...(Array.isArray(action.payload)
                    ? action.payload
                    : [action.payload]),
            ];
        });

        builder.addCase(removeFollowing.fulfilled, (state, action) => {
            state.totalCount && (state.totalCount -= 1);
            state.users = [
                ...state.users.filter(
                    (following) =>
                        following.userId !== action.meta.arg.followingId,
                ),
                ...(Array.isArray(action.payload)
                    ? action.payload
                    : [action.payload]),
            ];
        });

        builder.addCase(loadMore.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadMore.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.users = [...state.users, ...action.payload.users];
            state.totalCount = action.payload.query.totalCount;
        });
        builder.addCase(loadMore.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
