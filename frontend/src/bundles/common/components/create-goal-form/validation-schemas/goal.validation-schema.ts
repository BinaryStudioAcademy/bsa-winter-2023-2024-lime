import { z } from 'zod';

import { GoalFrequency } from '~/bundles/common/enums/enums.js';
import { ActivityType } from '~/bundles/goals/enums/enums.js';

type GoalRequestValidation = {
    activity: z.ZodNativeEnum<typeof ActivityType>;
    frequency: z.ZodNativeEnum<typeof GoalFrequency>;
    distance: z.ZodNullable<z.ZodNumber>;
    duration: z.ZodNullable<z.ZodNumber>;
};

const goalValidationSchema = z.object<GoalRequestValidation>({
    activity: z.nativeEnum(ActivityType),
    frequency: z.nativeEnum(GoalFrequency),
    distance: z.coerce.number().nullable(),
    duration: z.coerce.number().nullable(),
});

export { goalValidationSchema };
