import { type ValueOf } from '~/bundles/common/types/types.js';
import { ActivityType } from '~/bundles/goals/enums/enums.js';

const goalActivityToLabel: Record<ValueOf<typeof ActivityType>, string> = {
    [ActivityType.WALKING]: ActivityType.WALKING,
    [ActivityType.RUNNING]: ActivityType.RUNNING,
    [ActivityType.CYCLING]: ActivityType.CYCLING,
};

export { goalActivityToLabel };
