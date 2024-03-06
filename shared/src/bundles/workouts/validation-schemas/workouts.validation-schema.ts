import { z } from 'zod';

import { ActivityType } from '../../../enums/enums.js';

type WorkoutsRequestValidationDto = {
    activityType: z.ZodNativeEnum<typeof ActivityType>;
    steps: z.ZodOptional<z.ZodNumber>;
    heartRate: z.ZodNullable<z.ZodNumber>;
    workoutStartedAt: z.ZodString;
    workoutEndedAt: z.ZodString;
    distance: z.ZodNumber;
    speed: z.ZodNumber;
    kilocalories: z.ZodNumber;
};

const workout = z.object<WorkoutsRequestValidationDto>({
    activityType: z.nativeEnum(ActivityType),
    steps: z.number().nonnegative().optional(),
    heartRate: z.number().nonnegative().nullable(),
    workoutStartedAt: z.string(),
    workoutEndedAt: z.string(),
    distance: z.number().nonnegative(),
    speed: z.number().nonnegative(),
    kilocalories: z.number().nonnegative(),
});

export { workout };
