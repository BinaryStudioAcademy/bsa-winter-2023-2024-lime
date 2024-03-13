import { z } from 'zod';

import { ActivityType } from '../../../enums/enums.js';

type SchedulesRequestValidationDto = {
    activityType: z.ZodNativeEnum<typeof ActivityType>;
    goalId: z.ZodNumber;
    startAt: z.ZodString;
};

const schedules = z.object<SchedulesRequestValidationDto>({
    activityType: z.nativeEnum(ActivityType),
    startAt: z.string(),
    goalId: z.number(),
});

export { schedules };
