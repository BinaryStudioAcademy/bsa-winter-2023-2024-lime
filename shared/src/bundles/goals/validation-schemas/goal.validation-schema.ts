import { z } from 'zod';

import { ActivityType } from '../../../enums/enums.js';
import { FrequencyType } from '../enums/enums.js';

type GoalRequestValidationDto = {
    activity: z.ZodNativeEnum<typeof ActivityType>;
    frequency: z.ZodNumber;
    frequencyType: z.ZodNativeEnum<typeof FrequencyType>;
    distance: z.ZodNullable<z.ZodNumber>;
    duration: z.ZodNullable<z.ZodNumber>;
};

const goal = z.object<GoalRequestValidationDto>({
    activity: z.nativeEnum(ActivityType),
    frequency: z.number().int().positive(),
    frequencyType: z.nativeEnum(FrequencyType),
    distance: z.number().int().positive().nullable(),
    duration: z.number().int().positive().nullable(),
});

export { goal };
