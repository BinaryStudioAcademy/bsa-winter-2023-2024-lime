import { buyWithBonus, getById, loadAll,updateTrialSubscription } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    getById,
    buyWithBonus,
    updateTrialSubscription,
};

export { allActions as actions };
export { reducer } from './slice.js';
