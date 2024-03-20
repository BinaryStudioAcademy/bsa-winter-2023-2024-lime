import Stripe from 'stripe';

import { type SubscriptionStatus } from '~/bundles/subscriptions/enums/enums.js';
import { formatToDateFromUnix } from '~/common/helpers/helpers.js';
import {
    type CreateSubscriptionOptions,
    type CreateSubscriptionPlanOptions,
    type CreateSubscriptionPlanResponse,
    type CreateSubscriptionResponse,
    type UpdateSubscriptionOptions,
    type ValueOf,
} from '~/common/types/types.js';

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

    public async createCustomer(
        email: string,
    ): Promise<{ stripeCustomerId: string }> {
        const { id } = await this.stripeApi.customers.create({ email });
        return { stripeCustomerId: id };
    }

    public async createSubscriptionPlan({
        name,
        price,
        description = '',
    }: CreateSubscriptionPlanOptions): Promise<CreateSubscriptionPlanResponse> {
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
        stripeCustomerId,
        stripePriceId,
    }: CreateSubscriptionOptions): Promise<CreateSubscriptionResponse> {
        const subscription = await this.stripeApi.subscriptions.create({
            customer: stripeCustomerId,
            items: [{ price: stripePriceId }],
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
    }: UpdateSubscriptionOptions): Promise<void> {
        await this.stripeApi.subscriptions.update(stripeSubscriptionId, {
            cancel_at_period_end: isCanceled,
        });
    }

    public async updateToTrialSubscription({
        stripeSubscriptionId,        
    }: UpdateSubscriptionOptions): Promise<void> {
        const trial_end = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
        await this.stripeApi.subscriptions.update(stripeSubscriptionId, {
            trial_end: trial_end,
        });
    }

    public async immediateCancelSubscription(id: string): Promise<boolean> {
        return Boolean(await this.stripeApi.subscriptions.cancel(id));
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
