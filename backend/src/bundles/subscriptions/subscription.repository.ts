import { type Repository } from '~/common/types/repository.type.js';

import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionModel } from './subscription.model.js';

class SubscriptionRepository
    implements Omit<Repository, 'findAll' | 'delete' | 'update'>
{
    private subscriptionModel: typeof SubscriptionModel;

    public constructor(subscriptionModel: typeof SubscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<SubscriptionEntity | null> {
        const subscription = await this.subscriptionModel
            .query()
            .findOne(query)
            .where('status', 'active')
            .orderBy('createdAt', 'desc')
            .withGraphFetched('[subscriptionPlan]')
            .execute();

        if (!subscription) {
            return null;
        }

        const { subscriptionPlan, ...subscriptionInfo } = subscription;
        return SubscriptionEntity.initialize({
            ...subscriptionInfo,
            subscriptionPlanName: subscriptionPlan?.name ?? null,
            subscriptionPlanPrice: subscriptionPlan?.price ?? null,
            subscriptionPlanDescription: subscriptionPlan?.description ?? null,
        });
    }

    public async create(
        entity: SubscriptionEntity,
    ): Promise<SubscriptionEntity> {
        const {
            userId,
            planId,
            subscriptionToken,
            status,
            expirationDate,
            cancelAtPeriodEnd,
        } = entity.toNewObject();

        const subscription = await this.subscriptionModel
            .query()
            .insert({
                userId,
                planId,
                subscriptionToken,
                status,
                expirationDate,
                cancelAtPeriodEnd,
            })
            .returning('*')
            .execute();

        const { subscriptionPlan, ...subscriptionInfo } = subscription;

        return SubscriptionEntity.initialize({
            ...subscriptionInfo,
            subscriptionPlanName: subscriptionPlan?.name ?? null,
            subscriptionPlanPrice: subscriptionPlan?.price ?? null,
            subscriptionPlanDescription: subscriptionPlan?.description ?? null,
        });
    }

    public async updateSubscription(
        toUpdateBy: Record<string, unknown>,
        query: Record<string, unknown>,
    ): Promise<SubscriptionEntity | null> {
        await this.subscriptionModel
            .query()
            .findOne(toUpdateBy)
            .patch(query)
            .execute();

        const updatedSubscription = await this.find(toUpdateBy);

        if (!updatedSubscription) {
            return null;
        }

        return SubscriptionEntity.initialize({
            ...updatedSubscription.toObject(),
        });
    }
}

export { SubscriptionRepository };
