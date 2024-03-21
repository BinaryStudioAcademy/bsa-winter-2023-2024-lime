import { isToday } from 'date-fns';
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
                                CreateWorkoutValidationMessage.INVALID_FLOAT_FIELD,
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
                                CreateWorkoutValidationMessage.INVALID_FLOAT_FIELD,
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
            .pipe(
                z.coerce
                    .number({
                        errorMap: () => ({
                            message:
                                CreateWorkoutValidationMessage.INVALID_INT_FIELD,
                        }),
                    })
                    .int({
                        message:
                            CreateWorkoutValidationMessage.INVALID_INT_FIELD,
                    })
                    .nonnegative({
                        message: CreateWorkoutValidationMessage.POSITIVE_NUMBER,
                    }),
            ),
        heartRate: z
            .literal('', {
                errorMap: () => ({
                    message: CreateWorkoutValidationMessage.INVALID_INT_FIELD,
                }),
            })
            .transform(() => null)
            .or(
                z.coerce
                    .number({
                        errorMap: () => ({
                            message:
                                CreateWorkoutValidationMessage.INVALID_INT_FIELD,
                        }),
                    })
                    .int({
                        message:
                            CreateWorkoutValidationMessage.INVALID_INT_FIELD,
                    })
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
                    message: CreateWorkoutValidationMessage.INVALID_INT_FIELD,
                }),
            })
            .transform(() => null)
            .or(
                z.coerce
                    .number({
                        errorMap: () => ({
                            message:
                                CreateWorkoutValidationMessage.INVALID_INT_FIELD,
                        }),
                    })
                    .int({
                        message:
                            CreateWorkoutValidationMessage.INVALID_INT_FIELD,
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
            const { workoutDate, workoutStartedAt } = schema;
            if (!workoutDate || !workoutStartedAt) {
                return true;
            }
            const [day, month, year] = workoutDate.split('/');
            const enteredDate = new Date(`${year}-${month}-${day}`);
            const currentDate = new Date();

            if (!isToday(enteredDate)) {
                return true;
            }

            const [hours, minutes, seconds] = workoutStartedAt.split(':');
            const enteredDateWithTime = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                Number(hours),
                Number(minutes),
                Number(seconds),
            );
            return enteredDateWithTime <= currentDate;
        },
        {
            message: CreateWorkoutValidationMessage.WORKOUT_TIME_IN_FUTURE,
            path: ['workoutStartedAt'],
        },
    )
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
    )
    .refine(
        (schema) => {
            const { activityType, steps } = schema;
            return activityType === ActivityType.WALKING
                ? steps !== null
                : true;
        },
        {
            message: CreateWorkoutValidationMessage.STEPS_REQUIRED,
            path: ['steps'],
        },
    );

export { createWorkout };
