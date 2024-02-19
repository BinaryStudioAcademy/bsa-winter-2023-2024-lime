import { type Repository } from '~/common/types/types.js';

import { SubscriptionsEntity } from './subscription.entity.js';
import { type SubscriptionsModel } from './subscription.model.js';

class PlanRepository implements Repository {
    private planModel: typeof SubscriptionsModel;

    public constructor(planModel: typeof SubscriptionsModel) {
        this.planModel = planModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): ReturnType<Repository['find']> {
        return await this.planModel.query().findOne(query);
    }

    public async findAll(): Promise<SubscriptionsEntity[]> {
        const subscriptions = await this.planModel.query().execute();

        return subscriptions.map((subscription) => {
            return SubscriptionsEntity.initialize({ ...subscription });
        });
    }

    public async create(
        entity: SubscriptionsEntity,
    ): Promise<SubscriptionsEntity> {
        const { name, description, productToken, priceToken } =
            entity.toNewObject();
        const subscription = await this.planModel
            .query()
            .insert({
                name,
                description,
                productToken,
                priceToken,
            })
            .returning('*')
            .execute();

        return SubscriptionsEntity.initialize({ ...subscription });
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { PlanRepository };
