import { type Repository } from '~/common/types/types.js';

import { PlanEntity } from './plan.entity.js';
import { type PlanModel } from './plan.model.js';

class PlanRepository implements Repository {
    private planModel: typeof PlanModel;

    public constructor(planModel: typeof PlanModel) {
        this.planModel = planModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): ReturnType<Repository['find']> {
        return await this.planModel.query().findOne(query);
    }

    public async findAll(): Promise<PlanEntity[]> {
        const plans = await this.planModel.query().execute();

        return plans.map((plan) => {
            return PlanEntity.initialize({ ...plan });
        });
    }

    public async create(entity: PlanEntity): Promise<PlanEntity> {
        const { name, description, productToken, priceToken } =
            entity.toNewObject();
        const plan = await this.planModel
            .query()
            .insert({
                name,
                description,
                productToken,
                priceToken,
            })
            .returning('*')
            .execute();

        return PlanEntity.initialize({ ...plan });
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { PlanRepository };
