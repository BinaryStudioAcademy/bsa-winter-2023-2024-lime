import { logger } from '~/common/logger/logger.js';

import { GoalController } from './goal.controller.js';
import { GoalModel } from './goal.model.js';
import { GoalRepository } from './goal.repository.js';
import { GoalService } from './goal.service.js';

const goalRepository = new GoalRepository(GoalModel);
const goalService = new GoalService(goalRepository);
const goalController = new GoalController(logger, goalService);

export { goalController, goalService };
export { GoalEntity } from './goal.entity.js';
export { GoalModel } from './goal.model.js';
export { GoalService } from './goal.service.js';
export { type GoalRequestDto, type GoalResponseDto } from './types/types.js';
