import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type UserFollowingsResponseDto } from '../types/types.js';
import {
    addFollowing,
    getFollowings,
    getNotFollowed,
    removeFollowing,
} from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    users: UserFollowingsResponseDto[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    users: [],
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
            state.users = action.payload;
        });
        builder.addCase(getNotFollowed.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(getFollowings.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getFollowings.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.users = action.payload;
        });
        builder.addCase(getFollowings.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(addFollowing.fulfilled, (state, action) => {
            state.users = state.users.filter(
                (following) => following.id !== action.payload.id,
            );
        });

        builder.addCase(removeFollowing.fulfilled, (state, action) => {
            state.users = state.users.filter(
                (following) => following.id !== action.payload,
            );
        });
    },
});

export { type State, actions, name, reducer };
