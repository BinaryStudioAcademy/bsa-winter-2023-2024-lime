import { Action } from '../enums/enums.js';
import {
    type PrepareActionsResponse,
    type WorkoutRequestDto,
} from '../types/types.js';

const isEquivalentWorkout = (
    a: WorkoutRequestDto,
    b: WorkoutRequestDto,
): boolean => {
    const fieldsToCompare: (keyof WorkoutRequestDto)[] = [
        'activityType',
        'speed',
        'distance',
        'heartRate',
        'activityId',
        'kilocalories',
    ];

    for (const field of fieldsToCompare) {
        if (a[field] !== b[field]) {
            return false;
        }
    }

    if ((a.steps || 0) !== (b.steps || 0)) {
        return false;
    }

    return (
        a.workoutStartedAt.toISOString() === b.workoutStartedAt.toISOString() &&
        a.workoutEndedAt.toISOString() === b.workoutEndedAt.toISOString()
    );
};

const prepareActions = (
    dataFromDatabase: WorkoutRequestDto[],
    formattedData: WorkoutRequestDto[],
): PrepareActionsResponse[] => {
    const actions: PrepareActionsResponse[] = [];

    for (const data of dataFromDatabase) {
        if (
            !formattedData.some(
                ({ activityId }) => activityId === data.activityId,
            )
        ) {
            actions.push({ data, action: Action.DELETE });
        }
    }

    for (const data of formattedData) {
        if (
            !dataFromDatabase.some(
                ({ activityId }) => activityId === data.activityId,
            )
        ) {
            actions.push({ data, action: Action.CREATE });
        }

        if (!dataFromDatabase.some((item) => isEquivalentWorkout(item, data))) {
            actions.push({ data, action: Action.UPDATE });
        }
    }

    return actions;
};

export { prepareActions };
