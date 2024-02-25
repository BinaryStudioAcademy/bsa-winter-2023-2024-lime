import Stripe from 'stripe';

import { type SubscriptionStatus } from '~/bundles/subscriptions/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

class StipeService {
    private readonly stripeSecretKey: string;

    private readonly stripeApi: Stripe;

    public constructor(stripeSecretKey: string) {
        this.stripeSecretKey = stripeSecretKey;
        this.stripeApi = new Stripe(this.stripeSecretKey, {
            apiVersion: '2023-10-16',
        });
    }

    public async createCustomer({ email }: { email: string }): Promise<string> {
        const { id } = await this.stripeApi.customers.create({ email });
        return id;
    }

    public async createSubscriptionPlan({
        name,
        price,
        description = '',
    }: {
        name: string;
        price: number;
        description?: string;
    }): Promise<{
        productId: string;
        priceId: string;
    }> {
        const { id: productId } = await this.stripeApi.products.create({
            name,
            description,
        });

        const { id: priceId } = await this.stripeApi.prices.create({
            product: productId,
            unit_amount: price * 100,
            currency: 'usd',
            recurring: {
                interval: 'month',
            },
        });

        return { productId, priceId };
    }

    public async createSubscription({
        customerId,
        priceId,
    }: {
        customerId: string;
        priceId: string;
    }): Promise<{
        subscriptionToken: string;
        clientSecret: string;
        status: ValueOf<typeof SubscriptionStatus>;
        expirationDate: Date;
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
            subscriptionToken: subscription.id,
            clientSecret: (
                (subscription.latest_invoice as Stripe.Invoice)
                    .payment_intent as Stripe.PaymentIntent
            ).client_secret as string,
            status: subscription.status as ValueOf<typeof SubscriptionStatus>,
            expirationDate: new Date(subscription.current_period_end * 1000),
        };
    }

    public async updateCancelSubscription({
        subscriptionToken,
        cancelAtPeriodEnd,
    }: {
        subscriptionToken: string;
        cancelAtPeriodEnd: boolean;
    }): Promise<void> {
        await this.stripeApi.subscriptions.update(subscriptionToken, {
            cancel_at_period_end: cancelAtPeriodEnd,
        });
    }

    public async immediateCancelSubscription({
        subscriptionToken,
    }: {
        subscriptionToken: string;
    }): Promise<boolean> {
        return (await this.stripeApi.subscriptions.cancel(subscriptionToken))
            ? true
            : false;
    }
}

export { StipeService };
