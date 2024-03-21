import {
    achievementService,
    userAchievementService,
} from '~/bundles/achievements/achievements.js';
import { notificationService } from '~/bundles/notifications/notifications.js';

import { CalculationProgressService } from './calculation-progress.service.js';

const calculationProgressService = new CalculationProgressService({
    achievementService,
    userAchievementService,
    notificationService,
});

export { calculationProgressService };
