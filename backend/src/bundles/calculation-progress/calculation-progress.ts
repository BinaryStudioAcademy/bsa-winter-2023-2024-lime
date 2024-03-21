import {
    achievementService,
    userAchievementService,
} from '~/bundles/achievements/achievements.js';
import { goalService } from '~/bundles/goals/goals.js';
import { notificationService } from '~/bundles/notifications/notifications.js';

import { CalculationProgressService } from './calculation-progress.service.js';

const calculationProgressService = new CalculationProgressService({
    goalService,
    achievementService,
    userAchievementService,
    notificationService,
});

export { calculationProgressService };
