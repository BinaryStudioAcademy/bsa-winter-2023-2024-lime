type SubscriptionItemResponseDto = {
    id: number | null;
    userId: number;
    planId: number | null;
    status: string | null;
    subscriptionToken: string | null;
    customerToken: string | null;
    expirationDate: Date | null;
};

export { type SubscriptionItemResponseDto };
