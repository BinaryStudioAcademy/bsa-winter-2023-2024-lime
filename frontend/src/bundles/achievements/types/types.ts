import { type ValueOf } from '~/bundles/common/types/types.js';
import { type Activity } from '~/bundles/goals/enums/enums.js';

type AchievementResponseDto = {
    id: number;
    activity: ValueOf<typeof Activity>;
    name: string;
    createdAt: string;
};

export { type AchievementResponseDto };
