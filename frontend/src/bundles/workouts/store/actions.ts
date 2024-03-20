import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/async-thunk-config.type.js';
import { type WorkoutGetAllResponseDto } from '~/bundles/workouts/types/types.js';
import {
    type ValueOf,
    type WorkoutShowLastType,
} from '~/bundles/workouts/workouts.js';

import { name } from './slice.js';

const getWorkouts = createAsyncThunk<
    WorkoutGetAllResponseDto,
    ValueOf<typeof WorkoutShowLastType> | undefined,
    AsyncThunkConfig
>(`${name}/get-workouts`, async (showLast, { extra }) => {
    const { workoutApi } = extra;

    return await workoutApi.getAll(showLast);
});

export { getWorkouts };
