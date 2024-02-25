import { type ValueOf } from '../../../types/types.js';
import { type SubscriptionStatus } from '../subscriptions.js';

type SubscriptionGetItemResponseDto = {
    id: number | null;
    userId: number;
    planId: number;
    subscriptionToken: string;
    cancelAtPeriodEnd: boolean;
    status: ValueOf<typeof SubscriptionStatus>;
    expirationDate: Date;
    subscriptionPlanName: string | null;
    subscriptionPlanPrice: number | null;
    subscriptionPlanDescription: string | null;
};

export { type SubscriptionGetItemResponseDto };
