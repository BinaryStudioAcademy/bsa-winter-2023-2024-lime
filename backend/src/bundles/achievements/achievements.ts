import { logger } from '~/common/logger/logger.js';

import { AchievementController } from './achievement.controller.js';
import { AchievementModel } from './achievement.model.js';
import { AchievementRepository } from './achievement.repository.js';
import { AchievementService } from './achievement.service.js';

const achievementRepository = new AchievementRepository(AchievementModel);
const achievementService = new AchievementService(achievementRepository);
const achievementController = new AchievementController(
    logger,
    achievementService,
);

export { achievementController, achievementService };
export { AchievementEntity } from './achievement.entity.js';
export { AchievementModel } from './achievement.model.js';
export { AchievementService } from './achievement.service.js';
