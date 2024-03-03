import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

type AchievementResponseDto = {
    id: number;
    name: string;
    activityType: ValueOf<typeof ActivityType>;
    requirement: number;
    requirementMetric: string;
    createdAt: string;
};

export { type AchievementResponseDto };
