import { loadAllSubscriptionPlans } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAllSubscriptionPlans,
};

export { allActions as actions };
export { reducer } from './slice.js';
