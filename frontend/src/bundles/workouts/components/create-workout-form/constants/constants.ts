import { ActivityType } from '~/bundles/common/enums/enums.js';
import {
    configureDateString,
    getTimeFromDate,
} from '~/bundles/common/helpers/helpers.js';
import { type CreateWorkoutPayload } from '~/bundles/workouts/types/types.js';

const DEFAULT_CREATE_WORKOUT_PAYLOAD: CreateWorkoutPayload = {
    activityType: ActivityType.CYCLING,
    workoutDate: configureDateString(new Date().toISOString()),
    workoutStartedAt: getTimeFromDate(new Date(), 'HH:mm:ss'),
    workoutEndedAt: '',
    speed: '',
    distance: '',
    steps: '',
    heartRate: '',
    kilocalories: '',
};

const UnicodePattern = {
    DATE_PATTERN: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    TIME_PATTERN: /^(0\d|1\d|2[0-3])(?::[0-5]\d){2}$/,
} as const;

export { DEFAULT_CREATE_WORKOUT_PAYLOAD, UnicodePattern };
