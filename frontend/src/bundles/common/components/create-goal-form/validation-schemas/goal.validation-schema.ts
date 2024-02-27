import { UserValidationMessage } from 'shared';
import { z } from 'zod';

import { ActivityType } from '~/bundles/goals/enums/enums.js';

import { GoalFrequency } from '../enums/enums.js';

type GoalRequestValidation = {
    activity: z.ZodNativeEnum<typeof ActivityType>;
    frequency: z.ZodNativeEnum<typeof GoalFrequency>;
    distance: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
};

const regexDecimalNumbers = new RegExp(/^\d+$/);

const goalValidationSchema = z.object<GoalRequestValidation>({
    activity: z.nativeEnum(ActivityType),
    frequency: z.nativeEnum(GoalFrequency),
    distance: z
        .string()
        .regex(regexDecimalNumbers, {
            message: UserValidationMessage.INVALID,
        })
        .optional(),
    duration: z
        .string()
        .regex(regexDecimalNumbers, {
            message: UserValidationMessage.INVALID,
        })
        .optional(),
});

export { goalValidationSchema };