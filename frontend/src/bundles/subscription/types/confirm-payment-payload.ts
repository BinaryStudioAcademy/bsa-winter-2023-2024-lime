import { type Stripe, type StripeElements } from '@stripe/stripe-js';

type ConfirmPaymentPayload = {
    stripe: Stripe;
    elements: StripeElements;
};

export { type ConfirmPaymentPayload };
