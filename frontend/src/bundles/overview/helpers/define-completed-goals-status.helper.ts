import { type ValueOf } from '~/bundles/common/types/types.js';
import { type GoalResponseDto } from '~/bundles/goals/types/types.js';

import { CompletedGoalsStatus } from '../enums/enums.js';

const defineCompletedGoalsStatus = (
    goals: GoalResponseDto[],
    completedGoals: GoalResponseDto[],
): string => {
    let status: ValueOf<typeof CompletedGoalsStatus> =
        CompletedGoalsStatus.NO_GOALS;

    if (goals.length > 0 && completedGoals.length > 0) {
        status = CompletedGoalsStatus.COMPLETED_GOALS;
    } else if (goals.length > 0 && completedGoals.length === 0) {
        status = CompletedGoalsStatus.NO_COMPLETED_GOALS;
    }

    return status;
};

export { defineCompletedGoalsStatus };
