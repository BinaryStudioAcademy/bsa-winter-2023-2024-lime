import { type Service } from '~/common/types/types.js';

import { type SubscriptionPlanRepository } from './subscription-plan.repository.js';
import { type SubscriptionPlansGetAllResponseDto } from './types/types.js';

class SubscriptionPlanService implements Service {
    private subscriptionPlanRepository: SubscriptionPlanRepository;

    public constructor(subscriptionPlanRepository: SubscriptionPlanRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }

    public find(): ReturnType<Service['find']> {
        return Promise.resolve(null);
    }

    public create(): ReturnType<Service['create']> {
        return Promise.resolve(null);
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }

    public async findAll(): Promise<SubscriptionPlansGetAllResponseDto> {
        const items = await this.subscriptionPlanRepository.findAll();
        return { items: items.map((it) => it.toObject()) };
    }
}

export { SubscriptionPlanService };
