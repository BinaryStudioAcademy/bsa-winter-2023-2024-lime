import { type GoalResponseDto } from '~/bundles/goals/types/types.js';

const classifyGoalsByCompletion = (
    goals: GoalResponseDto[],
): {
    completedGoals: GoalResponseDto[];
    incompletedGoals: GoalResponseDto[];
} => {
    const completedGoals = [];
    const incompletedGoals = [];

    for (const goal of goals) {
        goal.completedAt === null
            ? incompletedGoals.push(goal)
            : completedGoals.push(goal);
    }

    return { completedGoals, incompletedGoals };
};

export { classifyGoalsByCompletion };
