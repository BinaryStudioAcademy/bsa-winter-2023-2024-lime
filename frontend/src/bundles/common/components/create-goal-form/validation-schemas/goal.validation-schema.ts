import { z } from 'zod';

import { GoalFrequency } from '~/bundles/common/enums/enums.js';
import { ActivityType } from '~/bundles/goals/enums/enums.js';

type GoalRequestValidation = {
    activity: z.ZodNativeEnum<typeof ActivityType>;
    frequency: z.ZodNativeEnum<typeof GoalFrequency>;
    distance: z.ZodOptional<z.ZodNumber>;
    duration: z.ZodOptional<z.ZodNumber>;
};

const goalValidationSchema = z.object<GoalRequestValidation>({
    activity: z.nativeEnum(ActivityType),
    frequency: z.nativeEnum(GoalFrequency),
    distance: z.coerce.number().optional(),
    duration: z.coerce.number().optional(),
});

export { goalValidationSchema };
