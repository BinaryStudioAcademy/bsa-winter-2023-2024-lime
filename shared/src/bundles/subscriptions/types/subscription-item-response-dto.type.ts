type SubscriptionItemResponseDto = {
    id: number | null;
    userId: number;
    planId: number | null;
    status: string | null;
    subscriptionToken: string | null;
    cancelAtPeriodEnd: boolean | null;
    expirationDate: Date | null;
};

export { type SubscriptionItemResponseDto };
