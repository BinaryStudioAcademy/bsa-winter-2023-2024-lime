import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type AchievementResponseDto } from '../types/types.js';
import { getAchievements } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    achievements: AchievementResponseDto[];
};

const achievements: AchievementResponseDto[] = [
    {
        id: 1,
        activityType: 'cycling',
        requirement: 3,
        requirementMetric: 'km',
        name: 'Running on track',
        createdAt: '2004-10-19 10:23:54+02',
    },
];

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    achievements: achievements,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'achievements',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAchievements.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getAchievements.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.achievements = action.payload;
        });
        builder.addCase(getAchievements.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
