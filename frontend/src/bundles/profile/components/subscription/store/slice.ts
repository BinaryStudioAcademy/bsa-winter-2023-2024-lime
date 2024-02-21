import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type SubscriptionPlansGetAllItemResponseDto } from '../types/types.js';
import { loadAllSubscriptionPlans } from './actions.js';

type State = {
    subscriptionPlans: SubscriptionPlansGetAllItemResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    subscriptionPlans: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'subscription-plans',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAllSubscriptionPlans.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadAllSubscriptionPlans.fulfilled, (state, action) => {
            state.subscriptionPlans = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAllSubscriptionPlans.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
