import { z } from 'zod';

import { ActivityType } from '~/bundles/goals/enums/enums.js';

import { UnicodePattern } from '../constants/constants.js';
import { ScheduleValidationMessage } from '../enums/enums.js';

const scheduleValidationSchema = z.object({
    activity: z.nativeEnum(ActivityType),
    dateOfStart: z
        .string()
        .regex(
            UnicodePattern.SCHEDULE_DATE_PATTERN,
            ScheduleValidationMessage.SCHEDULE_DATE_FORMAT,
        ),
    goalLabel: z.union([z.string(), z.number()]).nullable(),
});

export { scheduleValidationSchema };
