import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { signIn, signUp } from './actions.js';

type User = object;

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: User;
    message: string | undefined;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: {},
    message: undefined,
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
            state.message = undefined;
            state.user = action.payload;
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.dataStatus = DataStatus.REJECTED;
            state.message = action.error.message;
        });
    },
});

export { actions, name, reducer };
