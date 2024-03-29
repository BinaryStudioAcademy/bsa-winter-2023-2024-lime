import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type UserAuthResponseDto,
    type ValueOf,
} from '~/bundles/common/types/types.js';

import {
    authorizeIdentity,
    logout,
    refreshUser,
    signIn,
    signInIdentity,
    signUp,
    updateUser,
    uploadAvatar,
} from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: UserAuthResponseDto | null;
    isRefreshing: boolean;
    updateProfile: {
        dataStatus: ValueOf<typeof DataStatus>;
        avatarUrl: string | null;
    };
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: null,
    isRefreshing: true,
    updateProfile: {
        dataStatus: DataStatus.IDLE, // quick fix for the issue with blank layout while updating user profile
        avatarUrl: null,
    },
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        stopRefreshing(state) {
            state.isRefreshing = false;
        },
        clearUpdateProfile(state) {
            state.updateProfile = initialState.updateProfile;
        },
    },
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
            state.updateProfile.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.updateProfile.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload;
        });
        builder.addCase(updateUser.rejected, (state) => {
            state.updateProfile.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(uploadAvatar.pending, (state) => {
            state.updateProfile.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
            state.updateProfile.dataStatus = DataStatus.FULFILLED;
            state.updateProfile.avatarUrl = action.payload.avatarUrl;
        });
        builder.addCase(uploadAvatar.rejected, (state) => {
            state.updateProfile.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(authorizeIdentity.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(authorizeIdentity.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(authorizeIdentity.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(signInIdentity.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signInIdentity.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload.user;
        });
        builder.addCase(signInIdentity.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
