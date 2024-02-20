import { stripeService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import { type SubscriptionPlanRepository } from '../subscription-plans/subscription-plan.repository.js';
import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionRepository } from './subscription.repository.js';

class SubscriptionService implements Service {
    private subscriptionRepository: SubscriptionRepository;
    private subscriptionPlanRepository: SubscriptionPlanRepository;

    public constructor(
        subscriptionRepository: SubscriptionRepository,
        subscriptionPlanRepository: SubscriptionPlanRepository,
    ) {
        this.subscriptionRepository = subscriptionRepository;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
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
        const { subscriptionId, clientSecret, status, expirationDate } =
            await stripeService.createSubscription({
                customerId: customerToken,
                priceId: priceToken,
            });

        if (!subscriptionId || !clientSecret) {
            return null;
        }

        await this.subscriptionRepository.create(
            SubscriptionEntity.initializeNew({
                userId,
                planId,
                subscriptionToken: subscriptionId,
                customerToken,
                status,
                expirationDate,
            }),
        );

        return { subscriptionId, clientSecret };
    }
}

export { SubscriptionService };
