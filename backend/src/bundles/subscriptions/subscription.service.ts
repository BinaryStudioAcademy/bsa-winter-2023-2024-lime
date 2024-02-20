import { stripeService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import { userService } from '../users/users.js';
import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionRepository } from './subscription.repository.js';

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

    public async subscribe({
        planId,
        userId,
        priceToken,
    }: {
        userId: number;
        planId: number;
        priceToken: string;
    }): Promise<{ subscriptionId: string; clientSecret: string } | null> {
        const customerToken = await userService.getOrCreateStripeCustomer({
            userId,
        });

        if (!customerToken) {
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
