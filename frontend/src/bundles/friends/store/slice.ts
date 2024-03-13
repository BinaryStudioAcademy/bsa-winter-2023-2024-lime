import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type UserFollowingsResponseDto } from '../types/types.js';
import { addFollowing, getFollowings, removeFollowing } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    followings: UserFollowingsResponseDto[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    followings: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'followings',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getFollowings.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getFollowings.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.followings = action.payload;
        });
        builder.addCase(getFollowings.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(addFollowing.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(addFollowing.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.followings.unshift(action.payload);
        });
        builder.addCase(addFollowing.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(removeFollowing.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(removeFollowing.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.followings = state.followings.filter(
                (following) => following.id !== action.payload,
            );
        });
        builder.addCase(removeFollowing.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
