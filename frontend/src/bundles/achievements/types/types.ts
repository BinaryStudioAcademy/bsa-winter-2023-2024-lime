import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

type AchievementsGetAllResponseDto = {
    id: number;
    name: string;
    activityType: ValueOf<typeof ActivityType>;
    requirement: number;
    requirementMetric: string;
    createdAt: Date;
};

export { type AchievementsGetAllResponseDto };
