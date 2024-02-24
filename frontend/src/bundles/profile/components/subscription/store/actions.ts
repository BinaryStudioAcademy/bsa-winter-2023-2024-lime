import { createAsyncThunk } from '@reduxjs/toolkit';

import { actions as appActions } from '~/app/store/app.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { notificationManager } from '~/framework/notification/notification.js';

import {
    type CancelSubscriptionRequestDto,
    type ConfirmPaymentPayload,
    type SubscribeRequestDto,
    type SubscribeResponseDto,
    type SubscriptionGetItemResponseDto,
    type SubscriptionPlansGetAllResponseDto,
} from '../types/types.js';

//notificationManager has to be changed by notification action
const loadAllSubscriptionPlans = createAsyncThunk<
    SubscriptionPlansGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(
    'subscriptions/loadAllPlans',
    async (_, { extra: { subscriptionPlansApi } }) => {
        return subscriptionPlansApi.getAllSubscriptionPlans();
    },
);

const loadCurrentSubscription = createAsyncThunk<
    SubscriptionGetItemResponseDto,
    undefined,
    AsyncThunkConfig
>('subscriptions/loadCurrent', async (_, { extra: { subscriptionApi } }) => {
    return subscriptionApi.loadCurrentSubscription();
});

const createSubscription = createAsyncThunk<
    SubscribeResponseDto,
    SubscribeRequestDto,
    AsyncThunkConfig
>(
    'subscriptions/createSubscription',
    async (payload, { extra: { subscriptionApi } }) => {
        return subscriptionApi.createSubscription(payload);
    },
);

const updateCancelSubscription = createAsyncThunk<
    boolean,
    CancelSubscriptionRequestDto,
    AsyncThunkConfig
>(
    'subscriptions/cancelSubscription',
    async (payload, { extra: { subscriptionApi } }) => {
        const isCancelled = await subscriptionApi.cancelSubscription(payload);

        if (isCancelled) {
            notificationManager.success(
                'You successfuly cancelled a subscription!',
            );
            return true;
        }

        notificationManager.success('You successfuly renewed a subscription!');
        return false;
    },
);

const confirmPayment = createAsyncThunk<
    unknown,
    ConfirmPaymentPayload,
    AsyncThunkConfig
>('subscriptions/confirm-payment-intent', async (payload, { dispatch }) => {
    const { stripe, elements } = payload;

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: `${window.location.origin}${AppRoute.SUBSCRIPTION}`,
        },
    });

    if (
        error &&
        (error.type === 'card_error' || error.type === 'validation_error')
    ) {
        notificationManager.error('Payment error!');
    } else {
        notificationManager.success('You successfuly bought a subscription!');
        void dispatch(appActions.navigate(AppRoute.SUBSCRIPTION));
    }
});

export {
    confirmPayment,
    createSubscription,
    loadAllSubscriptionPlans,
    loadCurrentSubscription,
    updateCancelSubscription,
};
