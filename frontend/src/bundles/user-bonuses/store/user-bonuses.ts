import { loadAllUserBonusesTransactions } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAllUserBonusesTransactions,
};

export { allActions as actions };
export { reducer } from './slice.js';
