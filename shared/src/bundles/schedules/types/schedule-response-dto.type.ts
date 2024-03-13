import { type ActivityType } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';

type ScheduleResponseDto = {
    id: number;
    userId: number;
    goalId?: number;
    activityType: ValueOf<typeof ActivityType>;
    startAt: Date;
};

export { type ScheduleResponseDto };
