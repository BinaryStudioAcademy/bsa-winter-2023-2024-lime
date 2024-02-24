import {
    confirmPayment,
    createSubscription,
    loadAllSubscriptionPlans,
    loadCurrentSubscription,
    updateCancelSubscription,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAllSubscriptionPlans,
    loadCurrentSubscription,
    createSubscription,
    updateCancelSubscription,
    confirmPayment,
};

export { allActions as actions };
export { reducer } from './slice.js';
