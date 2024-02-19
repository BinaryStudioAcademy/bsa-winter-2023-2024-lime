import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { refreshUser, signUp } from './actions.js';

type User = object;

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: User;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: {},
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(refreshUser.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(refreshUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(refreshUser.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
export { type User };
