import { z } from 'zod';

import { ActivityType } from '../../../enums/enums.js';
import { OAuthProvider } from '../../oauth/oauth.js';

type WorkoutsRequestValidationDto = {
    activityType: z.ZodNativeEnum<typeof ActivityType>;
    steps: z.ZodOptional<z.ZodNumber>;
    activityId: z.ZodOptional<z.ZodNumber>;
    heartRate: z.ZodNullable<z.ZodNumber>;
    workoutStartedAt: z.ZodString;
    workoutEndedAt: z.ZodString;
    distance: z.ZodNumber;
    speed: z.ZodNumber;
    kilocalories: z.ZodNumber;
    provider: z.ZodNativeEnum<typeof OAuthProvider>;
};

const workout = z.object<WorkoutsRequestValidationDto>({
    activityType: z.nativeEnum(ActivityType),
    steps: z.number().nonnegative().optional(),
    activityId: z.number().nonnegative().optional(),
    heartRate: z.number().nonnegative().nullable(),
    workoutStartedAt: z.string(),
    workoutEndedAt: z.string(),
    distance: z.number().nonnegative(),
    speed: z.number().nonnegative(),
    kilocalories: z.number().nonnegative(),
    provider: z.nativeEnum(OAuthProvider),
});

export { workout };
