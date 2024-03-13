import {
    authorizeIdentity,
    logout,
    refreshUser,
    signIn,
    signInIdentity,
    signUp,
    updateUser,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    signIn,
    updateUser,
    refreshUser,
    logout,
    authorizeIdentity,
    signInIdentity,
};

export { allActions as actions };
export { reducer } from './slice.js';
