import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type UserAuthResponseDto,
    type ValueOf,
} from '~/bundles/common/types/types.js';

import {
    logout,
    refreshUser,
    signIn,
    signInOAuthUser,
    signUp,
    updateUser,
} from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: UserAuthResponseDto | null;
    isRefreshing: boolean;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: null,
    isRefreshing: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload.user;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(signIn.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload.user;
        });
        builder.addCase(signIn.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(refreshUser.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.isRefreshing = true;
        });
        builder.addCase(refreshUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.isRefreshing = false;
        });
        builder.addCase(refreshUser.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.isRefreshing = false;
        });
        builder.addCase(logout.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(logout.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload;
        });
        builder.addCase(updateUser.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(signInOAuthUser.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signInOAuthUser.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload.user;
        });
        builder.addCase(signInOAuthUser.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
