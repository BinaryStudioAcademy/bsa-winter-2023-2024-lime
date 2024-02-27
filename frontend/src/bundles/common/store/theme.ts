import { fetchTheme, toggleTheme } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    fetchTheme,
    toggleTheme,
};

export { reducer } from './slice.js';
export { allActions as actions };
