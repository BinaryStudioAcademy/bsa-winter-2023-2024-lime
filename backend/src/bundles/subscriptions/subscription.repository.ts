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
        const subcription = await this.subscriptionModel
            .query()
            .findOne(query)
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
        const { userId } = entity.toNewObject();

        const subscription = await this.subscriptionModel
            .query()
            .insert({
                userId,
            })
            .returning('*')
            .execute();

        return SubscriptionEntity.initialize({ ...subscription });
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
