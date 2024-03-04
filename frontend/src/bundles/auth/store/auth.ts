import { logout, refreshUser, signIn, signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    signIn,
    refreshUser,
    logout,
};

export { allActions as actions };
export { reducer } from './slice.js';
