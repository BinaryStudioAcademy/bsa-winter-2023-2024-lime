import { refreshUser, signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    refreshUser,
};

export { allActions as actions };
export { reducer } from './slice.js';
