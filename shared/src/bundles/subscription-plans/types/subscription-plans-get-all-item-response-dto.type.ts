type SubscriptionPlansGetAllItemResponseDto = {
    id: number;
    name: string;
    price: number;
    bonusPointsPrice: number;
    description: string | null;
    stripeProductId: string;
    stripePriceId: string;
};

export { type SubscriptionPlansGetAllItemResponseDto };
