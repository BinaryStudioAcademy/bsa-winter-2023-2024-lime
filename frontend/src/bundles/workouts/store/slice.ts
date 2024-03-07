import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

import { getWorkouts } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    workouts: WorkoutResponseDto[];
};

const initialState: State = {
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

export { type State, actions, name, reducer };
