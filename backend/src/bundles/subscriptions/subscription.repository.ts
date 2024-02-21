import { type Repository } from '~/common/types/repository.type.js';

import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionModel } from './subscription.model.js';

class SubscriptionRepository implements Omit<Repository, 'findAll' | 'delete'> {
    private subscriptionModel: typeof SubscriptionModel;

    public constructor(subscriptionModel: typeof SubscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }

    public update(): Promise<unknown> {
        throw new Error('Method not implemented.');
    }

    public async updateSubscription({
        userId,
        planId,
        status,
        subscriptionToken,
        expirationDate,
    }: {
        userId: number;
        planId: number | null;
        status: string | null;
        subscriptionToken: string | null;
        expirationDate: Date | null;
    }): Promise<SubscriptionEntity | null> {
        await this.subscriptionModel
            .query()
            .findOne({ userId })
            .patch({ planId, status, subscriptionToken, expirationDate })
            .execute();

        const updatedSubscription = await this.find({ userId });

        if (!updatedSubscription) {
            return null;
        }

        return SubscriptionEntity.initialize({
            ...updatedSubscription.toObject(),
        });
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
}

export { SubscriptionRepository };
