import { type GoalRequestDto } from './types.js';

type CreateGoalRequestDto = GoalRequestDto & {
    userId: number;
};

export { type CreateGoalRequestDto };
