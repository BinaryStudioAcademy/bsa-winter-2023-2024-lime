import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/async-thunk-config.type.js';
import {
    type WorkoutGetAllResponseDto,
    type WorkoutRequestDto,
    type WorkoutResponseDto,
} from '~/bundles/workouts/types/types.js';

import { name } from './slice.js';

const getWorkouts = createAsyncThunk<
    WorkoutGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${name}/get-workouts`, async (_, { extra }) => {
    const { workoutApi } = extra;

    return await workoutApi.getAll();
});

const getLastWorkoutsByUserId = createAsyncThunk<
    WorkoutGetAllResponseDto,
    number,
    AsyncThunkConfig
>(`${name}/get-last-by-user-id`, async (id, { extra }) => {
    const { workoutApi } = extra;
    const idString = String(id);
    return await workoutApi.getUserLastWorkouts(idString);
});

const createWorkout = createAsyncThunk<
    WorkoutResponseDto,
    WorkoutRequestDto,
    AsyncThunkConfig
>(`${name}/create-workout`, async (payload, { extra }) => {
    const { workoutApi } = extra;
    return await workoutApi.create(payload);
});

const deleteWorkout = createAsyncThunk<unknown, number, AsyncThunkConfig>(
    `${name}/delete-workout`,
    async (id, { extra }) => {
        const { workoutApi } = extra;

        await workoutApi.delete(id);
    },
);

export { createWorkout, deleteWorkout, getLastWorkoutsByUserId, getWorkouts };
