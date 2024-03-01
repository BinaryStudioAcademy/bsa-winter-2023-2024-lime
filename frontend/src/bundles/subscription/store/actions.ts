import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '~/bundles/common/enums/enums.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { notificationManager } from '~/framework/notification/notification.js';

import { StripeError } from '../enums/enums.js';
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
    Record<'isCanceled', boolean>,
    CancelSubscriptionRequestDto,
    AsyncThunkConfig
>(
    'subscription/cancelSubscription',
    async (payload, { extra: { subscriptionApi } }) => {
        const { isCanceled } =
            await subscriptionApi.cancelSubscription(payload);

        if (isCanceled) {
            notificationManager.success(
                'You successfuly cancelled a subscription!',
            );
        } else {
            notificationManager.success(
                'You successfuly renewed a subscription!',
            );
        }

        return { isCanceled };
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
            return_url: `${window.location.origin}${AppRoute.PROFILE_SUBSCRIPTION}`,
        },
    });

    if (
        error &&
        (error.type === StripeError.CARD_ERROR ||
            error.type === StripeError.VALIDATION_ERROR)
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
