import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AchievementResponseDto } from '~/bundles/achievements/types/types.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const getAchievements = createAsyncThunk<
    AchievementResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-achievements`, async (_, { extra }) => {
    const { achievementsApi } = extra;
    return await achievementsApi.getAchievements();
});

export { getAchievements };