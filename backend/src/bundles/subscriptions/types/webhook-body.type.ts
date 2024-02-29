import { type Stripe } from './types.js';

type WebhookBody = {
    stripeWebhookEvent: Stripe.Event;
};

export { type WebhookBody };
