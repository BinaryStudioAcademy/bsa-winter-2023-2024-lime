import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { forgotPassword, resetPassword } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'password-reset',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(forgotPassword.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(forgotPassword.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(forgotPassword.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(resetPassword.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(resetPassword.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
