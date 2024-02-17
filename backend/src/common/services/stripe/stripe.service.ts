import Stripe from 'stripe';

class StipeService {
    private readonly stripeSecretKey: string;

    private readonly stripeApi: Stripe;

    public constructor(stripeSecretKey: string) {
        this.stripeSecretKey = stripeSecretKey;
        this.stripeApi = new Stripe(this.stripeSecretKey, {
            apiVersion: '2023-10-16',
        });
    }

    public async createSubscription({
        customerId,
        priceId,
    }: {
        customerId: string;
        priceId: string;
    }): Promise<{
        subscriptionId: string;
        clientSecret: string | null;
    }> {
        const subscription = await this.stripeApi.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            payment_behavior: 'default_incomplete',
            payment_settings: {
                save_default_payment_method: 'on_subscription',
            },
            expand: ['latest_invoice.payment_intent'],
        });

        return {
            subscriptionId: subscription.id,
            clientSecret: (
                (subscription.latest_invoice as Stripe.Invoice)
                    .payment_intent as Stripe.PaymentIntent
            ).client_secret,
        };
    }
}

export { StipeService };
