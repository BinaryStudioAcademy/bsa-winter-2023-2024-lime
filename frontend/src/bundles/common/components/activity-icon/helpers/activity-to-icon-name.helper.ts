import { IconName } from '~/bundles/common/components/icon/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

const activityToIconName: Record<
    ValueOf<typeof ActivityType>,
    ValueOf<typeof IconName>
> = {
    'running': IconName.runningIcon,
    'cycling': IconName.cyclingIcon,
    'walking': IconName.walkingIcon,
};

export { activityToIconName };
