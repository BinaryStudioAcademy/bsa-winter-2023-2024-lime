import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

type CreateScheduleRequest = {
    activity: ValueOf<typeof ActivityType>;
};

export { type CreateScheduleRequest };
