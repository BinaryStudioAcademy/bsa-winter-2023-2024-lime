import { z } from 'zod';

import { ActivityType } from '../../../enums/enums.js';
import { ScheduleValidationMessage } from '../enums/enums.js';

const schedules = z.object({
    activityType: z.nativeEnum(ActivityType),
    startAt: z.string().refine(
        (value) => {
            const enteredDate = new Date(value);
            const currentDate = new Date();
            return enteredDate >= currentDate;
        },
        { message: ScheduleValidationMessage.SCHEDULE_DATE_WRONG },
    ),
    goalId: z.number().nullable(),
});

export { schedules };
