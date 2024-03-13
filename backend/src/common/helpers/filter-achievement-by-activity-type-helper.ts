import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import {
    type ActivityType,
    type ValueOf,
} from '~/bundles/achievements/enums/enums.js';

function filterAchievementByActivityType(
    array: AchievementEntity[],
    activityType: ValueOf<typeof ActivityType>,
): AchievementEntity[] {
    return array.filter(
        (item) => item.toObject().activityType === activityType,
    );
}
export { filterAchievementByActivityType };
