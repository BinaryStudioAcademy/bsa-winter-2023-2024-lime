import { type ActivityType, type ValueOf } from 'shared';

import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';

function filterAchievementByActivityType(
    array: AchievementEntity[],
    activityType: ValueOf<typeof ActivityType>,
): AchievementEntity[] {
    return array.filter(
        (item) => item.toObject().activityType === activityType,
    );
}
export { filterAchievementByActivityType };
