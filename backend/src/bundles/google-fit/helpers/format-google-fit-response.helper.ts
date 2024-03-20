import { GoogleFitRequiredActivity } from '../enums/enums.js';
import { type ValueOf, ActivityType } from '../types/types.js';

const formatActivityName = (
    activityTypeId: number | null,
): ValueOf<typeof ActivityType> | null => {
    const activityTypeMap: Map<number, ValueOf<typeof ActivityType>> = new Map([
        [GoogleFitRequiredActivity.WALKING, ActivityType.WALKING],
        [GoogleFitRequiredActivity.RUNNING, ActivityType.RUNNING],
        [GoogleFitRequiredActivity.CYCLING, ActivityType.CYCLING],
    ]);

    return activityTypeId ? activityTypeMap.get(activityTypeId) ?? null : null;
};

export { formatActivityName };
