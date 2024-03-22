import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type FriendResponseDto } from '../types/types.js';
import {
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
} from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    loadMoreDataStatus: ValueOf<typeof DataStatus>;
    users: FriendResponseDto[];
    followers: FriendResponseDto[];
    totalCount: number | undefined;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    loadMoreDataStatus: DataStatus.IDLE,
    users: [],
    followers: [],
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
            state.users = action.payload.items;
            state.totalCount = action.payload.total ?? 0;
        });
        builder.addCase(getNotFollowed.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(getFollowings.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getFollowings.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.users = action.payload.items;
            state.totalCount = action.payload.total ?? 0;
        });
        builder.addCase(getFollowings.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(getFollowers.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getFollowers.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.followers = action.payload.items;
            state.totalCount = action.payload.total ?? 0;
        });
        builder.addCase(getFollowers.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(addFollowing.fulfilled, (state, action) => {
            state.totalCount && (state.totalCount -= 1);
            state.users = [
                ...state.users.filter(
                    (following) =>
                        following.userId !== action.meta.arg.followingId,
                ),
                ...action.payload,
            ];
        });
        builder.addCase(removeFollowing.fulfilled, (state, action) => {
            state.totalCount && (state.totalCount -= 1);
            state.users = [
                ...state.users.filter(
                    (following) =>
                        following.userId !== action.meta.arg.followingId,
                ),
                ...action.payload,
            ];
        });

        builder.addCase(loadMoreFollowings.pending, (state) => {
            state.loadMoreDataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadMoreFollowings.fulfilled, (state, action) => {
            state.loadMoreDataStatus = DataStatus.FULFILLED;
            state.users = [...state.users, ...action.payload.items];
            state.totalCount = action.payload.total;
        });
        builder.addCase(loadMoreFollowings.rejected, (state) => {
            state.loadMoreDataStatus = DataStatus.REJECTED;
        });

        builder.addCase(loadMoreNotFollowed.pending, (state) => {
            state.loadMoreDataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadMoreNotFollowed.fulfilled, (state, action) => {
            state.loadMoreDataStatus = DataStatus.FULFILLED;
            state.users = [...state.users, ...action.payload.items];
            state.totalCount = action.payload.total;
        });
        builder.addCase(loadMoreNotFollowed.rejected, (state) => {
            state.loadMoreDataStatus = DataStatus.REJECTED;
        });

        builder.addCase(loadMoreFollowers.pending, (state) => {
            state.loadMoreDataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadMoreFollowers.fulfilled, (state, action) => {
            state.loadMoreDataStatus = DataStatus.FULFILLED;
            state.followers = [...state.followers, ...action.payload.items];
            state.totalCount = action.payload.total;
        });
        builder.addCase(loadMoreFollowers.rejected, (state) => {
            state.loadMoreDataStatus = DataStatus.REJECTED;
        });

        builder.addCase(addFollowingFollower.fulfilled, (state, action) => {
            state.followers = state.followers.map((follower) => {
                return follower.userId === action.meta.arg.followingId
                    ? {
                          ...follower,
                          isFollowing: true,
                      }
                    : follower;
            });
        });
        builder.addCase(removeFollowingFollower.fulfilled, (state, action) => {
            state.followers = state.followers.map((follower) => {
                return follower.userId === action.meta.arg.followingId
                    ? {
                          ...follower,
                          isFollowing: false,
                      }
                    : follower;
            });
        });
    },
});

export { type State, actions, name, reducer };
