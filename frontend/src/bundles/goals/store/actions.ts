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

const createGoal = createAsyncThunk<
    GoalResponseDto,
    GoalRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create-goal`, async (createGoalPayload, { extra }) => {
    const { goalsApi } = extra;
    return await goalsApi.createGoal(createGoalPayload);
});

export { createGoal, getGoals };
