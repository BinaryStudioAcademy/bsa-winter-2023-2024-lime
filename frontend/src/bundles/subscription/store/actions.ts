import { createAsyncThunk } from '@reduxjs/toolkit';

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

const loadAllSubscriptionPlans = createAsyncThunk<
    SubscriptionPlansGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(
    'subscription/loadAllPlans',
    async (_, { extra: { subscriptionPlansApi } }) => {
        return subscriptionPlansApi.getAllSubscriptionPlans();
    },
);

const loadCurrentSubscription = createAsyncThunk<
    Record<'currentSubscription', SubscriptionGetItemResponseDto>,
    undefined,
    AsyncThunkConfig
>('subscription/loadCurrent', async (_, { extra: { subscriptionApi } }) => {
    const currentSubscription = await subscriptionApi.loadCurrentSubscription();
    return { currentSubscription };
});

const createSubscription = createAsyncThunk<
    SubscribeResponseDto,
    SubscribeRequestDto,
    AsyncThunkConfig
>(
    'subscription/createSubscription',
    async (payload, { extra: { subscriptionApi } }) => {
        return subscriptionApi.createSubscription(payload);
    },
);

const updateCancelSubscription = createAsyncThunk<
    Record<'cancelAtPeriodEnd', boolean>,
    CancelSubscriptionRequestDto,
    AsyncThunkConfig
>(
    'subscription/cancelSubscription',
    async (payload, { extra: { subscriptionApi } }) => {
        const { cancelAtPeriodEnd } =
            await subscriptionApi.cancelSubscription(payload);

        if (cancelAtPeriodEnd) {
            notificationManager.success(
                'You successfuly cancelled a subscription!',
            );
        } else {
            notificationManager.success(
                'You successfuly renewed a subscription!',
            );
        }

        return { cancelAtPeriodEnd };
    },
);

const confirmPayment = createAsyncThunk<
    unknown,
    ConfirmPaymentPayload,
    AsyncThunkConfig
>('subscription/confirm-payment-intent', async (payload) => {
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
        notificationManager.error(error.message as string);
    }
});

export {
    confirmPayment,
    createSubscription,
    loadAllSubscriptionPlans,
    loadCurrentSubscription,
    updateCancelSubscription,
};
