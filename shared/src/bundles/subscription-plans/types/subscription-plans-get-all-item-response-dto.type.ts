type SubscriptionPlansGetAllItemResponseDto = {
    id: number;
    name: string;
    price: number;
    description: string | null;
    stripeProductId: string;
    stripePriceId: string;
};

export { type SubscriptionPlansGetAllItemResponseDto };
