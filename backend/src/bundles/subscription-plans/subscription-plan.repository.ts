import { type Repository } from '~/common/types/types.js';

import { SubscriptionPlanEntity } from './subscription-plan.entity.js';
import { type SubscriptionPlanModel } from './subscription-plan.model.js';

class SubscriptionPlanRepository implements Repository {
    private subscriptionPlanModel: typeof SubscriptionPlanModel;

    public constructor(subscriptionPlanModel: typeof SubscriptionPlanModel) {
        this.subscriptionPlanModel = subscriptionPlanModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<SubscriptionPlanEntity | null> {
        const plan = await this.subscriptionPlanModel
            .query()
            .findOne(query)
            .execute();

        if (!plan) {
            return null;
        }

        return SubscriptionPlanEntity.initialize({
            ...plan,
        });
    }

    public async findAll(): Promise<SubscriptionPlanEntity[]> {
        const plans = await this.subscriptionPlanModel.query().execute();
        return plans.map((plan) => {
            return SubscriptionPlanEntity.initialize({ ...plan });
        });
    }

    public async create(
        entity: SubscriptionPlanEntity,
    ): Promise<SubscriptionPlanEntity> {
        const {
            name,
            price,
            bonusPointsPrice,
            description,
            stripeProductId,
            stripePriceId,
        } = entity.toNewObject();

        const plan = await this.subscriptionPlanModel
            .query()
            .insert({
                name,
                price,
                bonusPointsPrice,
                description,
                stripeProductId,
                stripePriceId,
            })
            .returning('*')
            .execute();

        return SubscriptionPlanEntity.initialize({ ...plan });
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { SubscriptionPlanRepository };
