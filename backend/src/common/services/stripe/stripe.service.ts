import Stripe from 'stripe';

import { config } from '~/common/config/config.js';

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

    public async deleteCustomer({ id }: { id: string }): Promise<boolean> {
        try {
            await this.stripeApi.customers.del(id);
            return true;
        } catch {
            return false;
        }
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
        status: string;
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
            status: subscription.status,
            expirationDate: new Date(subscription.current_period_end * 1000),
        };
    }

    public async softCancelSubscription({
        subscriptionToken,
    }: {
        subscriptionToken: string;
    }): Promise<void> {
        await this.stripeApi.subscriptions.update(subscriptionToken, {
            cancel_at_period_end: true,
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

    public async stripeEventContructor({
        payload,
        signature,
    }: {
        payload: string;
        signature: string;
    }): Promise<Stripe.Event | null> {
        const event = await this.stripeApi.webhooks.constructEventAsync(
            payload,
            signature,
            config.ENV.STRIPE.WEBHOOK_SECRET,
        );

        if (!event) {
            return null;
        }

        return event;
    }
}

export { StipeService };
