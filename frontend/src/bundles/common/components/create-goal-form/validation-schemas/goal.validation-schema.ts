import { z } from 'zod';

import { GoalFrequency } from '~/bundles/common/enums/enums.js';
import { ActivityType } from '~/bundles/goals/enums/enums.js';

type GoalRequestValidation = {
    activity: z.ZodNativeEnum<typeof ActivityType>;
    frequency: z.ZodNativeEnum<typeof GoalFrequency>;
    distance: z.ZodNumber;
    duration: z.ZodNumber;
};

const goalValidationSchema = z.object<GoalRequestValidation>({
    activity: z.nativeEnum(ActivityType),
    frequency: z.nativeEnum(GoalFrequency),
    distance: z.coerce.number().positive(),
    duration: z.coerce.number().positive(),
});

export { goalValidationSchema };
