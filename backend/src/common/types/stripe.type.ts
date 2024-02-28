import { type SubscriptionStatus } from '~/bundles/subscriptions/enums/enums.js';

import { type ValueOf } from './types.js';

type CreateSubscriptionPlanOptions = {
    name: string;
    price: number;
    description?: string;
};

type CreateSubscriptionPlanResponse = {
    stripeProductId: string;
    stripePriceId: string;
};

type CreateSubscriptionOptions = {
    stripeCustomerId: string;
    stripePriceId: string;
};

type CreateSubscriptionResponse = {
    stripeSubscriptionId: string;
    clientSecret: string;
    status: ValueOf<typeof SubscriptionStatus>;
    expiresAt: Date;
};

type UpdateSubscriptionOptions = {
    stripeSubscriptionId: string;
    isCanceled: boolean;
};

export {
    type CreateSubscriptionOptions,
    type CreateSubscriptionPlanOptions,
    type CreateSubscriptionPlanResponse,
    type CreateSubscriptionResponse,
    type UpdateSubscriptionOptions,
};
