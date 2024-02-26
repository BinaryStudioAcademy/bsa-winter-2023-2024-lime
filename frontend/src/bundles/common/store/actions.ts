import { createAsyncThunk } from '@reduxjs/toolkit';

import { storage } from '~/framework/storage/storage.js';

import { applyThemeClassname } from '../helpers/helpers.js';
import { type Theme, type ValueOf } from '../types/types.js';

const fetchTheme = createAsyncThunk<ValueOf<typeof Theme>, undefined>(
    'theme/fetchTheme',
    async () => {
        const currentTheme = await storage.get('theme');
        const theme =
            currentTheme === null
                ? 'dark'
                : (currentTheme as ValueOf<typeof Theme>);
        await storage.set('theme', theme);
        applyThemeClassname(theme);
        return theme;
    },
);

const toggleTheme = createAsyncThunk<ValueOf<typeof Theme>, ValueOf<typeof Theme>>(
    'theme/toggleTheme',
    async (theme: ValueOf<typeof Theme>) => {
        applyThemeClassname(theme);
        await storage.set('theme', theme);

        return theme;
    },
);

export { fetchTheme, toggleTheme };
