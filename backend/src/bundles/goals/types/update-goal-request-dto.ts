import { type GoalRequestDto } from './types.js';

type UpdateGoalRequestDto = GoalRequestDto & {
    userId: number;
    progress?: number;
    completedAt?: string;
};

export { type UpdateGoalRequestDto };
