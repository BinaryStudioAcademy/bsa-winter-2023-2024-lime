import { logger } from '~/common/logger/logger.js';

import { SubscriptionController } from './subscription.controller.js';
import { SubscriptionModel } from './subscription.model.js';
import { SubscriptionRepository } from './subscription.repository.js';
import { SubscriptionService } from './subscription.service.js';

const subscriptionRepository = new SubscriptionRepository(SubscriptionModel);
const subscriptionService = new SubscriptionService(subscriptionRepository);
const subscriptionController = new SubscriptionController(
    logger,
    subscriptionService,
);

export { subscriptionController, subscriptionService };
