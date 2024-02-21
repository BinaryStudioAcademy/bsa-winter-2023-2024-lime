import { fetchTheme, setTheme } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    fetchTheme,
    setTheme,
};

export { allActions as actions };
export { reducer } from './slice.js';
