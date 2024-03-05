import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type OAuthResponseDto } from '~/bundles/profile/pages/connections-page/types/types.js';

import { getAll } from './actions.js';

type State = {
    connections: OAuthResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    connections: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'connections',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAll.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.connections = action.payload.items;
        });
        builder.addCase(getAll.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
