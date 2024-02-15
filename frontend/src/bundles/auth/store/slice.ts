import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { signUp } from './actions.js';

type User = {
    email: string;
    avatarUrl: string;
};

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: User;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: {
        email: 'email',
        avatarUrl: '',
    },
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
    },
});

export { actions, name, reducer };
