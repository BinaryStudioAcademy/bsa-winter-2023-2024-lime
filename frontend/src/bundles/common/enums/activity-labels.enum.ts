import { type ValueOf } from '~/bundles/common/types/types.js';
import { ActivityType } from '~/bundles/goals/enums/enums.js';

const ActivityLabels: Record<ValueOf<typeof ActivityType>, string> = {
    [ActivityType.WALKING]: ActivityType.WALKING,
    [ActivityType.RUNNING]: ActivityType.RUNNING,
    [ActivityType.CYCLING]: ActivityType.CYCLING,
} as const;

export { ActivityLabels };
