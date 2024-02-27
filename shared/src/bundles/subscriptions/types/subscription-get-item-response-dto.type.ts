import { type ValueOf } from '../../../types/types.js';
import { type SubscriptionStatus } from '../subscriptions.js';

type SubscriptionGetItemResponseDto = {
    id: number | null;
    userId: number;
    planId: number;
    stripeSubscriptionId: string;
    status: ValueOf<typeof SubscriptionStatus>;
    isCanceled: boolean;
    expiresAt: Date;
    subscriptionPlanName: string | null;
    subscriptionPlanPrice: number | null;
    subscriptionPlanDescription: string | null;
};

export { type SubscriptionGetItemResponseDto };
