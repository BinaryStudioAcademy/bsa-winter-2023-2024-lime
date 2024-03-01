import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';

import {
    type subscripcionsStateTypeSlice,    type SubscriptionGetItemResponseDto } from '../types/types.js';
import {
    confirmPayment,
    createSubscription,
    loadAllSubscriptionPlans,
    loadCurrentSubscription,
    updateCancelSubscription,
} from './actions.js';

const initialState: subscripcionsStateTypeSlice = {
    subscriptionPlans: [],
    currentSubscription: null,
    clientSecret: null,
    subscriptionToken: null,
    dataStatus: DataStatus.IDLE,
    confirmPaymentStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'subscription',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAllSubscriptionPlans.fulfilled, (state, action) => {
            state.subscriptionPlans = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAllSubscriptionPlans.rejected, (state) => {
            state.subscriptionPlans = null;
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(loadCurrentSubscription.fulfilled, (state, action) => {
            state.currentSubscription = action.payload.currentSubscription;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadCurrentSubscription.rejected, (state) => {
            state.currentSubscription = null;
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(createSubscription.fulfilled, (state, action) => {
            state.clientSecret = action.payload.clientSecret;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(createSubscription.rejected, (state) => {
            state.clientSecret = null;
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(updateCancelSubscription.fulfilled, (state, action) => {
            const isCanceled = action.payload.isCanceled;
            const updatedSubscription = {
                ...state.currentSubscription,
                isCanceled,
            } as SubscriptionGetItemResponseDto;

            state.currentSubscription = updatedSubscription;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(updateCancelSubscription.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
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
                updateCancelSubscription.pending,
                loadCurrentSubscription.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
    },
});

export { actions, name, reducer };
