type SubscriptionGetItemResponseDto = {
    id: number | null;
    userId: number;
    planId: number | null;
    subscriptionToken: string | null;
    cancelAtPeriodEnd: boolean | null;
    status: string | null;
    expirationDate: Date | null;
    subscriptionPlanName: string | null;
    subscriptionPlanPrice: number | null;
    subscriptionPlanDescription: string | null;
};

export { type SubscriptionGetItemResponseDto };
