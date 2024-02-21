import { createAsyncThunk } from '@reduxjs/toolkit';

import { storage } from '~/framework/storage/storage.js';

import { applyThemeClassname } from '../helpers/helpers.js';
import { type Theme } from '../types/types.js';

const fetchTheme = createAsyncThunk<Theme, undefined>(
    'theme/fetchTheme',
    async () => {
        const currentTheme = await storage.get('theme');
        const theme = currentTheme === null ? 'dark' : (currentTheme as Theme);
        await storage.set('theme', theme);
        applyThemeClassname(theme);
        return theme;
    },
);

const setTheme = createAsyncThunk<Theme, Theme>(
    'theme/setTheme',
    async (theme: Theme) => {
        applyThemeClassname(theme);
        await storage.set('theme', theme);

        return theme;
    },
);

export { fetchTheme, setTheme };
