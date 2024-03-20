import {
    confirmPayment,
    createSubscription,
    createSubscriptionTrial,
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
    createSubscriptionTrial,
};

export { allActions as actions };
export { reducer } from './slice.js';
