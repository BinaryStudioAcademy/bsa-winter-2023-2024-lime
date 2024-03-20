import { MINIMUM_DELETED_ROWS } from '~/common/constants/constants.js';
import { type Repository } from '~/common/types/repository.type.js';

import { SubscriptionAttributes, SubscriptionStatus } from './enums/enums.js';
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
            .where({
                [SubscriptionAttributes.USER_ID]: userId,
            })
            .whereIn(SubscriptionAttributes.STATUS, [
                SubscriptionStatus.TRIALING,
                SubscriptionStatus.ACTIVE,
            ])
            .orderBy(SubscriptionAttributes.CREATED_AT, 'DESC')
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
            .whereIn(SubscriptionAttributes.STATUS, [
                SubscriptionStatus.TRIALING,
                SubscriptionStatus.ACTIVE,
            ])
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
            .insert(entity.toNewObject())
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

    public async updateByStripeSubscriptionId(
        stripeSubscriptionId: string,
        payload: Record<string, unknown>,
    ): Promise<SubscriptionEntity | null> {
        const updatedSubscription = await this.subscriptionModel
            .query()
            .findOne({ stripeSubscriptionId })
            .patch(payload)
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

        return deletedRows > MINIMUM_DELETED_ROWS;
    }
}

export { SubscriptionRepository };
