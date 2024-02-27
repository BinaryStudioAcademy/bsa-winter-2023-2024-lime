import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

type AchievementResponseDto = {
    id: number;
    activity: ValueOf<typeof ActivityType>;
    name: string;
    createdAt: string;
};

export { type AchievementResponseDto };
