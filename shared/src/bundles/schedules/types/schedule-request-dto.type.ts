import { type ActivityType } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';

type ScheduleRequestDto = {
    goalId?: number;
    activityType: ValueOf<typeof ActivityType>;
    startAt: Date;
};

export { type ScheduleRequestDto };