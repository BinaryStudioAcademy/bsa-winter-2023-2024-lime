import { logger } from '~/common/logger/logger.js';

import { SubscriptionPlanController } from './subscription-plan.controller.js';
import { SubscriptionPlanModel } from './subscription-plan.model.js';
import { SubscriptionPlanRepository } from './subscription-plan.repository.js';
import { SubscriptionPlanService } from './subscription-plan.service.js';

const subscriptionPlanRepository = new SubscriptionPlanRepository(
    SubscriptionPlanModel,
);
const subscriptionPlanService = new SubscriptionPlanService(
    subscriptionPlanRepository,
);
const subscriptionPlanController = new SubscriptionPlanController(
    logger,
    subscriptionPlanService,
);

export {
    subscriptionPlanController,
    subscriptionPlanRepository,
    subscriptionPlanService,
};
export { SubscriptionPlanEntity } from './subscription-plan.entity.js';
export { SubscriptionPlanModel } from './subscription-plan.model.js';
export { SubscriptionPlanService } from './subscription-plan.service.js';
