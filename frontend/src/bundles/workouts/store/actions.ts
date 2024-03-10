import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/async-thunk-config.type.js';
import { type WorkoutGetAllResponseDto } from '~/bundles/workouts/types/types.js';

import { name } from './slice.js';

const getWorkouts = createAsyncThunk<
    WorkoutGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${name}/get-workouts`, async (_, { extra }) => {
    const { workoutApi } = extra;

    return await workoutApi.getAll();
});

export { getWorkouts };
