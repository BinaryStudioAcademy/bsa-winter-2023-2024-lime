import { getAchievements, getAchievementsByUserId } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAchievements,
    getAchievementsByUserId,
};

export { allActions as actions };
export { reducer } from './slice.js';
