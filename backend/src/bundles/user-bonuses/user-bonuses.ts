import { UserBonusModel } from './user-bonus.model.js';
import { UserBonusRepository } from './user-bonus.repository.js';
import { UserBonusService } from './user-bonus.service.js';

export { UserBonusAttributes } from './enums/enums.js';

const userBonusRepository = new UserBonusRepository(UserBonusModel);
const userBonusService = new UserBonusService(userBonusRepository);

export { userBonusService };
export { UserBonusEntity } from './user-bonus.entity.js';
export { UserBonusModel } from './user-bonus.model.js';
export { UserBonusRepository } from './user-bonus.repository.js';
export { UserBonusService } from './user-bonus.service.js';
