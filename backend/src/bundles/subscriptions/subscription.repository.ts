import { type Repository } from '~/common/types/repository.type.js';

import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionModel } from './subscription.model.js';

class SubscriptionRepository
    implements Omit<Repository, 'findAll' | 'update' | 'delete'>
{
    private subscriptionModel: typeof SubscriptionModel;

    public constructor(subscriptionModel: typeof SubscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<SubscriptionEntity | null> {
        const subcription = await this.subscriptionModel
            .query()
            .findOne(query)
            .withGraphFetched('[user, subscriptionPlan]')
            .execute();

        if (!subcription) {
            return null;
        }

        return SubscriptionEntity.initialize({
            ...subcription,
        });
    }

    public async create(
        entity: SubscriptionEntity,
    ): Promise<SubscriptionEntity> {
        const {
            userId,
            planId,
            subscriptionToken,
            customerToken,
            status,
            expirationDate,
        } = entity.toNewObject();

        const subscription = await this.subscriptionModel
            .query()
            .insert({
                userId,
                planId,
                subscriptionToken,
                customerToken,
                status,
                expirationDate,
            })
            .returning('*')
            .execute();

        return SubscriptionEntity.initialize({ ...subscription });
    }
}

export { SubscriptionRepository };
