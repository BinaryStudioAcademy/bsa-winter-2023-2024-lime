import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type UserAuthResponseDto,
    type ValueOf,
} from '~/bundles/common/types/types.js';

import { refreshUser, signIn, signUp } from './actions.js';

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
    },
});

export { type State, actions, name, reducer };
