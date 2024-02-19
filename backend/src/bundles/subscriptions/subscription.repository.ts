import { type Repository } from '~/common/types/repository.type.js';

import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionModel } from './subscription.model.js';

class SubscriptionRepository
    implements Omit<Repository, 'find' | 'findAll' | 'update' | 'delete'>
{
    private subscriptionModel: typeof SubscriptionModel;

    public constructor(subscriptionModel: typeof SubscriptionModel) {
        this.subscriptionModel = subscriptionModel;
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
