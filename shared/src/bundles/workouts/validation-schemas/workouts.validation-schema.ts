import { z } from 'zod';

import { ActivityType } from '../../../enums/enums.js';

type WorkoutsRequestValidationDto = {
    activityType: z.ZodNativeEnum<typeof ActivityType>;
    steps: z.ZodOptional<z.ZodNumber>;
    heartRate: z.ZodNumber;
    workoutStartedAt: z.ZodString;
    workoutEndedAt: z.ZodString;
    distance: z.ZodNumber;
    speed: z.ZodNumber;
    kilocalories: z.ZodNumber;
};

const workout = z.object<WorkoutsRequestValidationDto>({
    activityType: z.nativeEnum(ActivityType),
    steps: z.number().int().nonnegative().optional(),
    heartRate: z.number().int().nonnegative(),
    workoutStartedAt: z.string(),
    workoutEndedAt: z.string(),
    distance: z.number().int().nonnegative(),
    speed: z.number().int().nonnegative(),
    kilocalories: z.number().int().nonnegative(),
});

export { workout };
