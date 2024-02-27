import { z } from 'zod';

import { ActivityType } from '../../../enums/enums.js';

type UpdateWorkoutsRequestValidationDto = {
    activity: z.ZodNativeEnum<typeof ActivityType>;
    steps: z.ZodOptional<z.ZodNumber>;
    heartRate: z.ZodNumber;
    workoutStartedAt: z.ZodDate;
    workoutEndedAt: z.ZodNullable<z.ZodDate>;
    distance: z.ZodNumber;
    speed: z.ZodNumber;
    kilocalories: z.ZodNumber;
};

type CreateWorkoutsRequestValidationDto = {
    activity: z.ZodNativeEnum<typeof ActivityType>;
};

const updateWorkout = z.object<UpdateWorkoutsRequestValidationDto>({
    activity: z.nativeEnum(ActivityType),
    steps: z.number().int().nonnegative().optional(),
    heartRate: z.number().int().nonnegative(),
    workoutStartedAt: z.date(),
    workoutEndedAt: z.date().nullable(),
    distance: z.number().int().nonnegative(),
    speed: z.number().int().nonnegative(),
    kilocalories: z.number().int().nonnegative(),
});

const createWorkout = z.object<CreateWorkoutsRequestValidationDto>({
    activity: z.nativeEnum(ActivityType),
});

export { createWorkout, updateWorkout };
