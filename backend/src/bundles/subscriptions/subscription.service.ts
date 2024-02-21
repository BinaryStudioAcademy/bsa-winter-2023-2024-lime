import { stripeService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import { type SubscriptionRepository } from './subscription.repository.js';

type SubscriptionObject = {
    id: number | null;
    userId: number;
    planId: number | null;
    status: string | null;
    subscriptionToken: string | null;
    customerToken: string | null;
    expirationDate: Date | null;
};

class SubscriptionService implements Service {
    private subscriptionRepository: SubscriptionRepository;

    public constructor(subscriptionRepository: SubscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public find(): ReturnType<Service['find']> {
        return Promise.resolve(null);
    }

    public findAll(): ReturnType<Service['findAll']> {
        return Promise.resolve({ items: [] });
    }

    public create(): ReturnType<Service['create']> {
        return Promise.resolve(null);
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }

    private async getSubscriptionByUserIdPlanId({
        planId,
        userId,
    }: {
        userId: number;
        planId: number;
    }): Promise<SubscriptionObject | null> {
        const currentPlan = await this.subscriptionRepository.find({
            planId,
            userId,
        });
        if (!currentPlan) {
            return null;
        }
        return currentPlan?.toObject();
    }

    public async subscribe({
        planId,
        userId,
        customerToken,
        priceToken,
    }: {
        userId: number;
        planId: number;
        customerToken: string;
        priceToken: string;
    }): Promise<{ subscriptionId: string; clientSecret: string } | null> {
        if (!planId || !userId || !customerToken || !priceToken) {
            return null;
        }

        const currentSubscription = await this.getSubscriptionByUserIdPlanId({
            userId,
            planId,
        });
        if (
            !currentSubscription ||
            (currentSubscription.planId === planId &&
                currentSubscription.status === 'active')
        ) {
            return null;
        }

        const { subscriptionId, clientSecret, status, expirationDate } =
            await stripeService.createSubscription({
                customerId: customerToken,
                priceId: priceToken,
            });

        if (!subscriptionId || !clientSecret) {
            return null;
        }

        try {
            await this.subscriptionRepository.updateSubscription({
                userId,
                planId,
                status,
                subscriptionToken: subscriptionId,
                expirationDate,
            });

            return { subscriptionId, clientSecret };
        } catch (error) {
            await stripeService.cancelSubscription({
                subscriptionToken: subscriptionId,
            });

            throw error;
        }
    }

    public async cancelSubscribtion({
        planId,
        userId,
    }: {
        userId: number;
        planId: number;
    }): Promise<boolean> {
        const currentSubscription = await this.getSubscriptionByUserIdPlanId({
            userId,
            planId,
        });

        if (!currentSubscription || !currentSubscription.subscriptionToken) {
            return false;
        }

        await stripeService.cancelSubscription({
            subscriptionToken: currentSubscription.subscriptionToken,
        });

        await this.subscriptionRepository.updateSubscription({
            userId,
            planId: null,
            status: null,
            subscriptionToken: null,
            expirationDate: null,
        });

        return true;
    }
}

export { SubscriptionService };
