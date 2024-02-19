import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type UserAuthResponseDto,
    type ValueOf,
} from '~/bundles/common/types/types.js';

import { signIn, signUp } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: UserAuthResponseDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: null,
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
    },
});

export { type State, actions, name, reducer };
