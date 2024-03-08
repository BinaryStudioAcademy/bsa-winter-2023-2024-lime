import { getAchievements } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAchievements,
};

export { allActions as actions };
export { reducer } from './slice.js';
