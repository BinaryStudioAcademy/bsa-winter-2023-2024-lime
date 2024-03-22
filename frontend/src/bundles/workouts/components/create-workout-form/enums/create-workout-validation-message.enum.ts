import { CreateWorkoutValidationRule } from './create-workout-validation-rule.enum.js';

const { SPEED, HEART_RATE } = CreateWorkoutValidationRule;

const CreateWorkoutValidationMessage = {
    REQUIRED: 'Please fill out this field',
    DATE_FORMAT: 'Invalid date format. Use DD/MM/YYYY',
    WORKOUT_DATE_IN_FUTURE: 'Workout date cannot be in the future',
    WORKOUT_TIME_IN_FUTURE: 'Workout time cannot be in the future',
    TIME_FORMAT: 'Invalid time format. Use HH:mm:ss',
    SPEED_VALUE: `Speed should be from ${SPEED.MIN_VALUE} to ${SPEED.MAX_VALUE} km/h.`,
    HEART_RATE_VALUE: `Heart rate should be from ${HEART_RATE.MIN_VALUE} to ${HEART_RATE.MAX_VALUE} bpm.`,
    INVALID_FLOAT_FIELD: 'Field should contain numbers and a decimal point',
    INVALID_INT_FIELD: 'Field should contain only numbers',
    POSITIVE_NUMBER: 'Field should contain only positive numbers',
    END_TIME_BEFORE_START_TIME: 'End time should be after start time',
    STEPS_REQUIRED: 'For walking workouts, steps are required',
} as const;

export { CreateWorkoutValidationMessage };
