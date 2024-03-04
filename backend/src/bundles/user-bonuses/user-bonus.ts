import { UserBonusModel } from './user-bonus.model.js';
import { UserBonusRepository } from './user-bonus.repository.js';
import { UserBonusService } from './user-bonus.service.js';

const userRepository = new UserBonusRepository(UserBonusModel);
const userService = new UserBonusService(userRepository);

export { userService };
export { UserBonusAttributes } from './enums/enums.js';
export { UserBonusEntity } from './user-bonus.entity.js';
export { UserBonusModel } from './user-bonus.model.js';
export { UserBonusService } from './user-bonus.service.js';
