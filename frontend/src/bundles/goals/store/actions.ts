import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type GoalRequestDto,
    type GoalResponseDto,
} from '~/bundles/goals/types/types.js';

import { name as sliceName } from './slice.js';

const getGoals = createAsyncThunk<
    GoalResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-goals`, async (_, { extra }) => {
    const { goalsApi } = extra;
    return await goalsApi.getGoals();
});

const getGoalsByUserId = createAsyncThunk<
    GoalResponseDto[],
    number,
    AsyncThunkConfig
>(`${sliceName}/get-by-user-id`, async (id, { extra }) => {
    const { goalsApi } = extra;
    const idString = String(id);
    return goalsApi.getGoalsByUserId(idString);
});

const createGoal = createAsyncThunk<
    GoalResponseDto,
    GoalRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create-goal`, async (createGoalPayload, { extra }) => {
    const { goalsApi } = extra;
    return await goalsApi.createGoal(createGoalPayload);
});

const deleteGoal = createAsyncThunk<boolean, number, AsyncThunkConfig>(
    `${sliceName}/delete-goal`,
    async (id, { extra }) => {
        const { goalsApi } = extra;
        const idString = String(id);
        return await goalsApi.deleteGoal(idString);
    },
);

export { createGoal, deleteGoal, getGoals, getGoalsByUserId };
