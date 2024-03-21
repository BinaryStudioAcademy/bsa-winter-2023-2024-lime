import { type ActivityType } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';

type ScheduleResponseDto = {
    id: number;
    goalId?: number | null;
    activityType: ValueOf<typeof ActivityType>;
    startAt: string;
};

export { type ScheduleResponseDto };
