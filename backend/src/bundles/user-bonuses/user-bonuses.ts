import { logger } from '~/common/logger/logger.js';

import { userRepository } from '../users/users.js';
import { UserBonusController } from './user-bonus.controller.js';
import { UserBonusModel } from './user-bonus.model.js';
import { UserBonusRepository } from './user-bonus.repository.js';
import { UserBonusService } from './user-bonus.service.js';

const userBonusRepository = new UserBonusRepository(UserBonusModel);
const userBonusService = new UserBonusService(
    userRepository,
    userBonusRepository,
);
const userBonusController = new UserBonusController(logger, userBonusService);

export { userBonusController, userBonusService };
export {
    BonusAmount,
    UserBonusActionType,
    UserBonusAttributes,
    UserBonusTransactionType,
} from './enums/enums.js';
export { UserBonusEntity } from './user-bonus.entity.js';
export { UserBonusModel } from './user-bonus.model.js';
export { UserBonusRepository } from './user-bonus.repository.js';
export { UserBonusService } from './user-bonus.service.js';
