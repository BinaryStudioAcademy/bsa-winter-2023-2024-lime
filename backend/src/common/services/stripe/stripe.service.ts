import Stripe from 'stripe';

import { type SubscriptionStatus } from '~/bundles/subscriptions/enums/enums.js';
import { formatToDateFromUnix } from '~/common/helpers/helpers.js';
import { type ValueOf } from '~/common/types/types.js';

class StripeService {
    private readonly stripeSecretKey: string;

    private readonly stripeWebhookSecretKey: string;

    private readonly stripeApi: Stripe;

    public constructor(
        stripeSecretKey: string,
        stripeWebhookSecretKey: string,
    ) {
        this.stripeSecretKey = stripeSecretKey;
        this.stripeWebhookSecretKey = stripeWebhookSecretKey;
        this.stripeApi = new Stripe(this.stripeSecretKey, {
            apiVersion: '2023-10-16',
        });
    }

    public async createCustomer({
        email,
    }: {
        email: string;
    }): Promise<{ stripeCustomerId: string }> {
        const { id } = await this.stripeApi.customers.create({ email });
        return { stripeCustomerId: id };
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
        stripeProductId: string;
        stripePriceId: string;
    }> {
        const { id: stripeProductId } = await this.stripeApi.products.create({
            name,
            description,
        });

        const { id: stripePriceId } = await this.stripeApi.prices.create({
            product: stripeProductId,
            unit_amount: price * 100,
            currency: 'usd',
            recurring: {
                interval: 'month',
            },
        });

        return { stripeProductId, stripePriceId };
    }

    public async createSubscription({
        customerId,
        priceId,
    }: {
        customerId: string;
        priceId: string;
    }): Promise<{
        stripeSubscriptionId: string;
        clientSecret: string;
        status: ValueOf<typeof SubscriptionStatus>;
        expiresAt: Date;
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
            stripeSubscriptionId: subscription.id,
            clientSecret: (
                (subscription.latest_invoice as Stripe.Invoice)
                    .payment_intent as Stripe.PaymentIntent
            ).client_secret as string,
            status: subscription.status as ValueOf<typeof SubscriptionStatus>,
            expiresAt: formatToDateFromUnix(subscription.current_period_end),
        };
    }

    public async updateCancelSubscription({
        stripeSubscriptionId,
        isCanceled,
    }: {
        stripeSubscriptionId: string;
        isCanceled: boolean;
    }): Promise<void> {
        await this.stripeApi.subscriptions.update(stripeSubscriptionId, {
            cancel_at_period_end: isCanceled,
        });
    }

    public async immediateCancelSubscription({
        stripeSubscriptionId,
    }: {
        stripeSubscriptionId: string;
    }): Promise<boolean> {
        return Boolean(
            await this.stripeApi.subscriptions.cancel(stripeSubscriptionId),
        );
    }

    public async verifyWebhookRequest(
        body: string | Buffer,
        signature: string,
    ): Promise<Stripe.Event> {
        return await this.stripeApi.webhooks.constructEventAsync(
            body,
            signature,
            this.stripeWebhookSecretKey,
        );
    }
}

export { StripeService };
