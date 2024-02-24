import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type AchievementResponsetDto } from '../types/types.js';
import { getAchievements } from './actions.js';

const achievements: AchievementResponsetDto[] = [
    {
        id: 1,
        activity: 'walking',
        name: '100 km',
        createdAt: '2004-10-19 10:23:54+02',
    },
    {
        id: 2,
        activity: 'running',
        name: 'First 30',
        createdAt: '2004-10-20 10:23:54+02',
    },
    {
        id: 3,
        activity: 'cycling',
        name: '200 km',
        createdAt: '2004-10-21 10:23:54+02',
    },
    {
        id: 4,
        activity: 'running',
        name: '10 km',
        createdAt: '2004-10-22 10:23:54+02',
    },
];

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    achievements: AchievementResponsetDto[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    achievements: achievements || [],
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
