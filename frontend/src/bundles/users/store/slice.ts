import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';

import {
    buyWithBonus,
    getById,
    loadAll,
    updateTrialSubscription,
} from './actions.js';

type State = {
    users: UserAuthResponseDto[];
    user: UserAuthResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    users: [],
    user: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'users',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAll.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAll.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(getById.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getById.fulfilled, (state, action) => {
            state.user = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getById.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(buyWithBonus.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(buyWithBonus.fulfilled, (state, action) => {
            state.user = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(buyWithBonus.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(updateTrialSubscription.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(updateTrialSubscription.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(updateTrialSubscription.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
