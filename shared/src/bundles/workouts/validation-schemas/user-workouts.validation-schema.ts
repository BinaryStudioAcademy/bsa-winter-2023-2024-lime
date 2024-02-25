import { z } from 'zod';

import { Activity } from '../../../enums/enums.js';

type UserWorkoutsPUTRequestValidationDto = {
    activity: z.ZodNativeEnum<typeof Activity>;
    duration: z.ZodNumber;
    kilocalories: z.ZodNumber;
    steps: z.ZodNumber;
};

type UserWorkoutsPOSTRequestValidationDto = {
    activity: z.ZodNativeEnum<typeof Activity>;
};

const updateUserWorkouts = z.object<UserWorkoutsPUTRequestValidationDto>({
    activity: z.nativeEnum(Activity),
    duration: z.number().int().nonnegative(),
    kilocalories: z.number().int().nonnegative(),
    steps: z.number().int().nonnegative(),
});

const createUserWorkouts = z.object<UserWorkoutsPOSTRequestValidationDto>({
    activity: z.nativeEnum(Activity),
});

export { createUserWorkouts, updateUserWorkouts };
