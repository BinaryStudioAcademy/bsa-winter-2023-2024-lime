import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type WorkoutStateTypeSlice } from '~/bundles/workouts/types/types.js';

import { getWorkouts } from './actions.js';

const initialState: WorkoutStateTypeSlice = {
    dataStatus: DataStatus.IDLE,
    workouts: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'workouts',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getWorkouts.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getWorkouts.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.workouts = action.payload.items;
        });
        builder.addCase(getWorkouts.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type initialState as State, actions, name, reducer };
