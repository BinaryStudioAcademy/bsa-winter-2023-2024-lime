import { type Service } from '~/common/types/types.js';

import { type SubscriptionPlanRepository } from './subscription-plan.repository.js';
import { type SubscriptionPlansGetAllResponseDto } from './types/types.js';

class SubscriptionPlanService
    implements Omit<Service, 'find' | 'create' | 'update' | 'delete'>
{
    private subscriptionPlanRepository: SubscriptionPlanRepository;

    public constructor(subscriptionPlanRepository: SubscriptionPlanRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }

    public async findAll(): Promise<SubscriptionPlansGetAllResponseDto> {
        const items = await this.subscriptionPlanRepository.findAll();
        return { items: items.map((it) => it.toObject()) };
    }
}

export { SubscriptionPlanService };
