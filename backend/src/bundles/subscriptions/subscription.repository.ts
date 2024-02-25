import { type Repository } from '~/common/types/repository.type.js';

import { SubscriptionStatus, SunscriptionAttributes } from './enums/enums.js';
import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionModel } from './subscription.model.js';

class SubscriptionRepository
    implements Omit<Repository, 'find' | 'findAll' | 'delete' | 'update'>
{
    private subscriptionModel: typeof SubscriptionModel;

    public constructor(subscriptionModel: typeof SubscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }

    public async findAllActiveUserSubscriptions(
        userId: number,
    ): Promise<SubscriptionEntity[] | null> {
        const subscriptions = await this.subscriptionModel
            .query()
            .where(SunscriptionAttributes.USER_ID, userId)
            .andWhere(SunscriptionAttributes.STATUS, SubscriptionStatus.ACTIVE)
            .orderBy(SunscriptionAttributes.CREATED_AT, 'desc')
            .withGraphFetched('[subscriptionPlan]')
            .execute();

        if (!subscriptions) {
            return null;
        }

        return subscriptions.map((subscription) => {
            const { subscriptionPlan, ...subscriptionInfo } = subscription;
            return SubscriptionEntity.initialize({
                ...subscriptionInfo,
                subscriptionPlanName: subscriptionPlan?.name ?? null,
                subscriptionPlanPrice: subscriptionPlan?.price ?? null,
                subscriptionPlanDescription:
                    subscriptionPlan?.description ?? null,
            });
        });
    }

    public async findCurrentSubscription(
        query: Record<string, unknown>,
    ): Promise<SubscriptionEntity | null> {
        const subscription = await this.subscriptionModel
            .query()
            .findOne(query)
            .where(SunscriptionAttributes.STATUS, SubscriptionStatus.ACTIVE)
            .orderBy(SunscriptionAttributes.CREATED_AT, 'DESC')
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

    public async updateSubscriptionByToken(
        subscriptionToken: string,
        query: Record<string, unknown>,
    ): Promise<SubscriptionEntity | null> {
        await this.subscriptionModel
            .query()
            .findOne({ subscriptionToken })
            .patch(query)
            .execute();

        const updatedSubscription = await this.findCurrentSubscription({
            subscriptionToken,
        });

        if (!updatedSubscription) {
            return null;
        }

        return SubscriptionEntity.initialize({
            ...updatedSubscription.toObject(),
        });
    }
}

export { SubscriptionRepository };
