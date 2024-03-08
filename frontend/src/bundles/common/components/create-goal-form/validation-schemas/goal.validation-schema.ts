import { z } from 'zod';

import { CUSTON_ERROR_MESSAGE } from '~/bundles/common/components/create-goal-form/constants/constants.js';
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
    distance: z.coerce
        .number({
            invalid_type_error: CUSTON_ERROR_MESSAGE.NOT_FLOAT_MESSAGE,
        })
        .nullable(),
    duration: z.coerce
        .number({
            invalid_type_error: CUSTON_ERROR_MESSAGE.NOT_INTEGER_MESSAGE,
        })
        .int()
        .nullable(),
});

export { goalValidationSchema };
