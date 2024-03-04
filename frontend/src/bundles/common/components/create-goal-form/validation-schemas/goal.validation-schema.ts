import { z } from 'zod';

import { ActivityType } from '~/bundles/goals/enums/enums.js';

import { GoalFrequency } from '../enums/enums.js';

type GoalRequestValidation = {
    activity: z.ZodNativeEnum<typeof ActivityType>;
    frequency: z.ZodNativeEnum<typeof GoalFrequency>;
    distance: z.ZodOptional<z.ZodNumber>;
    duration: z.ZodOptional<z.ZodNumber>;
};

const goalValidationSchema = z.object<GoalRequestValidation>({
    activity: z.nativeEnum(ActivityType),
    frequency: z.nativeEnum(GoalFrequency),
    distance: z.coerce.number().int().optional(),
    duration: z.coerce.number().int().optional(),
});

export { goalValidationSchema };
