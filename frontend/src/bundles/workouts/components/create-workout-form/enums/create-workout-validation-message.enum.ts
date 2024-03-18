import { CreateWorkoutValidationRule } from './create-workout-validation-rule.enum.js';

const { SPEED, HEART_RATE } = CreateWorkoutValidationRule;

const CreateWorkoutValidationMessage = {
    REQUIRED: 'Please fill out this field',
    DATE_FORMAT: 'Invalid date format. Use DD/MM/YYYY',
    WORKOUT_DATE_IN_FUTURE: 'Workout date cannot be in the future',
    TIME_FORMAT: 'Invalid time format. Use HH:mm:ss',
    SPEED_VALUE: `Weight should be from ${SPEED.MIN_VALUE} to ${SPEED.MAX_VALUE} km/h.`,
    HEART_RATE_VALUE: `Heart rate should be from ${HEART_RATE.MIN_VALUE} to ${HEART_RATE.MAX_VALUE} bpm.`,
    INVALID_FIELD: 'Field should contain only numbers',
    POSITIVE_NUMBER: 'Field should contain only positive numbers',
    END_TIME_BEFORE_START_TIME: 'End time should be after start time',
} as const;

export { CreateWorkoutValidationMessage };
