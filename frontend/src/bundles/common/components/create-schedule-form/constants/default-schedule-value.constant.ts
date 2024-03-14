import { getActivityOptions } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

const DEFAULT_SCHEDULE_FORM_VALUE = {
    activity: getActivityOptions[0]?.value as ValueOf<typeof ActivityType>,
};

export { DEFAULT_SCHEDULE_FORM_VALUE };
