import { createSlice } from '@reduxjs/toolkit';

import {
    type PayloadAction,
    type ValueOf,
} from '~/bundles/common/types/types.js';

import { type Theme } from '../enums/theme.js';
import { fetchTheme, setTheme } from './actions.js';

type State = {
    theme: ValueOf<typeof Theme> | null;
    loading: boolean;
};

const initialState = {
    theme: null as ValueOf<typeof Theme> | null,
    loading: true,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'theme',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTheme.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchTheme.fulfilled,
                (state, action: PayloadAction<ValueOf<typeof Theme>>) => {
                    state.theme = action.payload;
                    state.loading = false;
                },
            )
            .addCase(setTheme.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                setTheme.fulfilled,
                (state, action: PayloadAction<ValueOf<typeof Theme>>) => {
                    state.theme = action.payload;
                    state.loading = false;
                },
            );
    },
});

export { type State, actions, name, reducer };
