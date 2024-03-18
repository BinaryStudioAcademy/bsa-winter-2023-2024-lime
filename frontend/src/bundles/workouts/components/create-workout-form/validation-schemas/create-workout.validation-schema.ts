import { z } from 'zod';

import { ActivityType } from '~/bundles/common/enums/enums.js';

import { UnicodePattern } from '../constants/constants.js';
import {
    CreateWorkoutValidationMessage,
    CreateWorkoutValidationRule,
} from '../enums/enums.js';

const createWorkout = z
    .object({
        activityType: z.nativeEnum(ActivityType),
        distance: z
            .string()
            .min(1, {
                message: CreateWorkoutValidationMessage.REQUIRED,
            })
            .pipe(
                z.coerce
                    .number({
                        errorMap: () => ({
                            message:
                                CreateWorkoutValidationMessage.INVALID_FIELD,
                        }),
                    })
                    .nonnegative({
                        message: CreateWorkoutValidationMessage.POSITIVE_NUMBER,
                    }),
            ),
        speed: z
            .string()
            .min(1, { message: CreateWorkoutValidationMessage.REQUIRED })
            .pipe(
                z.coerce
                    .number({
                        errorMap: () => ({
                            message:
                                CreateWorkoutValidationMessage.INVALID_FIELD,
                        }),
                    })
                    .min(CreateWorkoutValidationRule.SPEED.MIN_VALUE, {
                        message: CreateWorkoutValidationMessage.SPEED_VALUE,
                    })
                    .max(CreateWorkoutValidationRule.SPEED.MAX_VALUE, {
                        message: CreateWorkoutValidationMessage.SPEED_VALUE,
                    }),
            ),
        kilocalories: z
            .string()
            .min(1, {
                message: CreateWorkoutValidationMessage.REQUIRED,
            })
            .pipe(z.coerce.number().nonnegative()),
        heartRate: z
            .literal('', {
                errorMap: () => ({
                    message: CreateWorkoutValidationMessage.INVALID_FIELD,
                }),
            })
            .transform(() => null)
            .or(
                z.coerce
                    .number()
                    .min(CreateWorkoutValidationRule.HEART_RATE.MIN_VALUE, {
                        message:
                            CreateWorkoutValidationMessage.HEART_RATE_VALUE,
                    })
                    .max(CreateWorkoutValidationRule.HEART_RATE.MAX_VALUE, {
                        message:
                            CreateWorkoutValidationMessage.HEART_RATE_VALUE,
                    }),
            )
            .optional(),
        steps: z
            .literal('', {
                errorMap: () => ({
                    message: CreateWorkoutValidationMessage.INVALID_FIELD,
                }),
            })
            .transform(() => null)
            .or(
                z.coerce
                    .number({
                        errorMap: () => ({
                            message:
                                CreateWorkoutValidationMessage.INVALID_FIELD,
                        }),
                    })
                    .nonnegative({
                        message: CreateWorkoutValidationMessage.POSITIVE_NUMBER,
                    }),
            )
            .optional(),
        workoutDate: z.union([
            z
                .string()
                .regex(
                    UnicodePattern.DATE_PATTERN,
                    CreateWorkoutValidationMessage.DATE_FORMAT,
                )
                .refine(
                    (value) => {
                        if (!value) {
                            return true;
                        }
                        const [day, month, year] = value.split('/');
                        const enteredDate = new Date(`${year}-${month}-${day}`);
                        const currentDate = new Date();
                        return enteredDate <= currentDate;
                    },
                    {
                        message:
                            CreateWorkoutValidationMessage.WORKOUT_DATE_IN_FUTURE,
                    },
                )
                .nullable(),
            z.literal(''),
        ]),
        workoutStartedAt: z
            .string()
            .trim()
            .regex(
                UnicodePattern.TIME_PATTERN,
                CreateWorkoutValidationMessage.TIME_FORMAT,
            ),
        workoutEndedAt: z
            .string()
            .trim()
            .regex(
                UnicodePattern.TIME_PATTERN,
                CreateWorkoutValidationMessage.TIME_FORMAT,
            ),
    })
    .refine(
        (schema) => {
            const { workoutDate, workoutStartedAt, workoutEndedAt } = schema;

            if (!workoutDate || !workoutStartedAt || !workoutEndedAt) {
                return true;
            }

            const [day, month, year] = workoutDate.split('/');

            const startedDate = new Date(
                `${year}-${month}-${day}T${workoutStartedAt}`,
            );
            const endedDate = new Date(
                `${year}-${month}-${day}T${workoutEndedAt}`,
            );

            if (!startedDate || !endedDate) {
                return true;
            }

            return startedDate < endedDate;
        },
        {
            message: CreateWorkoutValidationMessage.END_TIME_BEFORE_START_TIME,
            path: ['workoutEndedAt'],
        },
    );

export { createWorkout };
