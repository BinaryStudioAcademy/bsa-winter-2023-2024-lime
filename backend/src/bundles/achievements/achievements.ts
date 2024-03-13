import { logger } from '~/common/logger/logger.js';

import { AchievementController } from './achievement.controller.js';
import { AchievementModel } from './achievement.model.js';
import { AchievementRepository } from './achievement.repository.js';
import { AchievementService } from './achievement.service.js';
import { UserAchievementModel } from './user-achievement.model.js';
import { UserAchievementRepository } from './user-achievement.repository.js';
import { UserAchievementService } from './user-achievement.service.js';

const achievementRepository = new AchievementRepository(AchievementModel);
const achievementService = new AchievementService(achievementRepository);

const userAchievementRepository = new UserAchievementRepository(
    UserAchievementModel,
);
const userAchievementService = new UserAchievementService(
    userAchievementRepository,
);
const achievementController = new AchievementController(
    logger,
    achievementService,
);

export { achievementController, achievementService, userAchievementService };
export { AchievementEntity } from './achievement.entity.js';
export { AchievementModel } from './achievement.model.js';
export { AchievementService } from './achievement.service.js';
