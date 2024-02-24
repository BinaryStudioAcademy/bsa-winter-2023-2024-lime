import { UserValidationMessage } from 'shared';
import { z } from 'zod';

import { Activity } from '~/bundles/goals/enums/enums.js';

import { FrequencyValue } from '../enums/goal-frequency.enum.js';

type GoalRequestValidation = {
    activity: z.ZodNativeEnum<typeof Activity>;
    frequency: z.ZodNativeEnum<typeof FrequencyValue>;
    distance: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
};

const regexDecimalNumbers = new RegExp(/^\d+$/);

const goalValidationSchema = z.object<GoalRequestValidation>({
    activity: z.nativeEnum(Activity),
    frequency: z.nativeEnum(FrequencyValue),
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
