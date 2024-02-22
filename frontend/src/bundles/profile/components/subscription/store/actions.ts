import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Stripe, type StripeElements } from '@stripe/stripe-js';

import { actions as appActions } from '~/app/store/app.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { notificationManager } from '~/framework/notification/notification.js';

import { type SubscriptionPlansGetAllResponseDto } from '../types/types.js';

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

type SubscribeOptions = {
    planId: number;
    userId: number;
    priceToken: string;
    customerToken: string;
};

const createSubscription = createAsyncThunk<
    { clientSecret: string; subscriptionToken: string },
    SubscribeOptions,
    AsyncThunkConfig
>(
    'subscriptions/createSubscription',
    async (payload, { extra: { subscriptionApi } }) => {
        return subscriptionApi.createSubscription(payload);
    },
);

const cancelSubscription = createAsyncThunk<
    unknown,
    { userId: number },
    AsyncThunkConfig
>(
    'subscriptions/cancelSubscription',
    async (payload, { extra: { subscriptionApi } }) => {
        const { isCanceled } =
            await subscriptionApi.cancelSubscription(payload);

        if (isCanceled) {
            notificationManager.success(
                'Your subscription was successully canceled!',
            );
        } else {
            notificationManager.error('Your subscription was not canceled!');
        }
    },
);

const confirmPayment = createAsyncThunk<
    unknown,
    {
        stripe: Stripe;
        elements: StripeElements;
    },
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
        notificationManager.error('Something went wrong!');
    } else {
        notificationManager.success('You successfuly bought a subscription!');
        dispatch(appActions.navigate(AppRoute.SUBSCRIPTION));
    }
});

export {
    cancelSubscription,
    confirmPayment,
    createSubscription,
    loadAllSubscriptionPlans,
};
