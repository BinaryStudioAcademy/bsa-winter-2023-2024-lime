import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { type Theme } from '../types/types.js';
import { fetchTheme, setTheme } from './actions.js';

type State = {
    theme: Theme | null;
    loading: boolean;
};

const initialState = {
    theme: null as Theme | null,
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
                (state, action: PayloadAction<Theme>) => {
                    state.theme = action.payload;
                    state.loading = false;
                },
            )
            .addCase(setTheme.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                setTheme.fulfilled,
                (state, action: PayloadAction<Theme>) => {
                    state.theme = action.payload;
                    state.loading = false;
                },
            );
    },
});

export { type State, actions, name, reducer };
