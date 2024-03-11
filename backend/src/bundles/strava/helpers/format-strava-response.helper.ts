import {
    ActivityType,
    MILLISECONDS_PER_SECOND,
    StravaRequiredActivity,
} from '../constants/constants.js';
import { OAuthProvider } from '../enums/enums.js';
import {
    type StravaActivityResponseDto,
    type ValueOf,
    type WorkoutRequestDto,
} from '../types/types.js';

const formatActivityName = (
    activityName: string,
): ValueOf<typeof ActivityType> | null => {
    let result;
    switch (activityName) {
        case StravaRequiredActivity.WALK: {
            result = ActivityType.WALKING;
            break;
        }
        case StravaRequiredActivity.RUN: {
            result = ActivityType.RUNNING;
            break;
        }
        case StravaRequiredActivity.RIDE: {
            result = ActivityType.CYCLING;
            break;
        }
    }
    return result ?? null;
};

const formatStravaResponse = ({
    average_speed,
    start_date,
    distance,
    calories,
    type,
    heartrate,
    elapsed_time,
}: StravaActivityResponseDto): WorkoutRequestDto | null => {
    const startDate = new Date(start_date);
    const endDate = new Date(
        startDate.getTime() + elapsed_time * MILLISECONDS_PER_SECOND,
    );
    const activityType = formatActivityName(type);

    if (!activityType) {
        return null;
    }

    return {
        activityType,
        speed: average_speed,
        workoutStartedAt: start_date,
        distance,
        kilocalories: calories,
        workoutEndedAt: endDate,
        heartRate: heartrate ?? null,
        provider: OAuthProvider.STRAVA ?? null,
    };
};

export { formatStravaResponse };
