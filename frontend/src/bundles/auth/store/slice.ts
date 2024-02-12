import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { signUp } from './actions.js';

type User = {
    email: string;
    password: string;
};

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: User;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: { email: '', password: '' },
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
            state.user = { email: 'lera', password: 'lera' };
        });
    },
});

export { actions, name, reducer };
