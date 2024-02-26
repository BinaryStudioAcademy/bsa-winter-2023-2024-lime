import { forgotPassword, resetPassword } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    forgotPassword,
    resetPassword,
};

export { allActions as actions };
export { reducer } from './slice.js';
