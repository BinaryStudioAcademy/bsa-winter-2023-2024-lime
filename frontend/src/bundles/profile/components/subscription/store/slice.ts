import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type SubscriptionPlansGetAllItemResponseDto } from '../types/types.js';
import {
    cancelSubscription,
    confirmPayment,
    createSubscription,
    loadAllSubscriptionPlans,
} from './actions.js';

type State = {
    subscriptionPlans: SubscriptionPlansGetAllItemResponseDto[];
    clientSecret: string | null;
    subscriptionToken: string | null;
    dataStatus: ValueOf<typeof DataStatus>;
    confirmPaymentStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    subscriptionPlans: [],
    clientSecret: null,
    subscriptionToken: null,
    dataStatus: DataStatus.IDLE,
    confirmPaymentStatus: DataStatus.IDLE,
};

const { reducer, name, actions } = createSlice({
    initialState,
    name: 'subscriptions',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAllSubscriptionPlans.fulfilled, (state, action) => {
            state.subscriptionPlans = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(createSubscription.fulfilled, (state, action) => {
            state.clientSecret = action.payload.clientSecret;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(cancelSubscription.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(confirmPayment.pending, (state) => {
            state.confirmPaymentStatus = DataStatus.PENDING;
        });
        builder.addCase(confirmPayment.fulfilled, (state) => {
            state.confirmPaymentStatus = DataStatus.FULFILLED;
        });
        builder.addCase(confirmPayment.rejected, (state) => {
            state.confirmPaymentStatus = DataStatus.REJECTED;
        });
        builder.addMatcher(
            isAnyOf(
                loadAllSubscriptionPlans.pending,
                createSubscription.pending,
                cancelSubscription.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                loadAllSubscriptionPlans.rejected,
                createSubscription.rejected,
                cancelSubscription.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
