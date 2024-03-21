import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AchievementsGetAllResponseDto } from '~/bundles/achievements/types/types.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const getAchievements = createAsyncThunk<
    AchievementsGetAllResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-achievements`, async (_, { extra }) => {
    const { achievementsApi } = extra;
    return await achievementsApi.getAchievements();
});

const getAchievementsByUserId = createAsyncThunk<
    AchievementsGetAllResponseDto[],
    number,
    AsyncThunkConfig
>(`${sliceName}/get-by-user-id`, async (id, { extra }) => {
    const { achievementsApi } = extra;
    const idString = String(id);
    return await achievementsApi.getUserAchievements(idString);
});

export { getAchievements, getAchievementsByUserId };
