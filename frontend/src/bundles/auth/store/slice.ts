import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { signUp } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    isLoggedIn: boolean;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    isLoggedIn: false,
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
            state.isLoggedIn = true;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.isLoggedIn = false;
        });
    },
});

export { actions, name, reducer };
