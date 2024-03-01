import { createSlice } from '@reduxjs/toolkit';

import {
    type PayloadAction,
    type ThemeType,
} from '~/bundles/common/types/types.js';

import { fetchTheme, toggleTheme } from './actions.js';

type State = {
    theme: ThemeType | null;
};

const initialState = {
    theme: null as ThemeType | null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'theme',
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(
                fetchTheme.fulfilled,
                (state, action: PayloadAction<ThemeType>) => {
                    state.theme = action.payload;
                },
            )

            .addCase(
                toggleTheme.fulfilled,
                (state, action: PayloadAction<ThemeType>) => {
                    state.theme = action.payload;
                },
            );
    },
});

export { type State, actions, name, reducer };
