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
        const subscription = await this.subscriptionModel
            .query()
            .insert({
                ...entity.toNewObject(),
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
        const updatedSubscription = await this.subscriptionModel
            .query()
            .findOne({ subscriptionToken })
            .patch(query)
            .returning('*')
            .first()
            .execute();

        if (!updatedSubscription) {
            return null;
        }

        const { subscriptionPlan, ...subscriptionInfo } = updatedSubscription;

        return SubscriptionEntity.initialize({
            ...subscriptionInfo,
            subscriptionPlanName: subscriptionPlan?.name ?? null,
            subscriptionPlanPrice: subscriptionPlan?.price ?? null,
            subscriptionPlanDescription: subscriptionPlan?.description ?? null,
        });
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        const deletedRows = await this.subscriptionModel
            .query()
            .where(query)
            .delete();

        return deletedRows > 0;
    }
}

export { SubscriptionRepository };
