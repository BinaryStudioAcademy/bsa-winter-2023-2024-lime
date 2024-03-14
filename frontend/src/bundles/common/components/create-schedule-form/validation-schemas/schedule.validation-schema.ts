import { z } from 'zod';

import { ActivityType } from '~/bundles/goals/enums/enums.js';

type ScheduleRequestValidation = {
    activity: z.ZodNativeEnum<typeof ActivityType>;
};

const scheduleValidationSchema = z.object<ScheduleRequestValidation>({
    activity: z.nativeEnum(ActivityType),
});

export { scheduleValidationSchema };
