import { type GoalResponseDto } from '~/bundles/goals/types/types.js';

const sortGoalsByDate = (schedules: GoalResponseDto[]): GoalResponseDto[] => {
    return [...schedules].sort((a, b) => {
        return (
            new Date(a.completedAt as string).getTime() -
            new Date(b.completedAt as string).getTime()
        );
    });
};

export { sortGoalsByDate };
