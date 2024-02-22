import {
    cancelSubscription,
    confirmPayment,
    createSubscription,
    loadAllSubscriptionPlans,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAllSubscriptionPlans,
    createSubscription,
    cancelSubscription,
    confirmPayment,
};

export { allActions as actions };
export { reducer } from './slice.js';
