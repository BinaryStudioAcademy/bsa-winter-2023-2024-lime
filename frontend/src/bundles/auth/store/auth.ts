import {
    logout,
    refreshUser,
    signIn,
    signUp,
    updateUser,
    upload,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    signIn,
    updateUser,
    refreshUser,
    logout,
    upload,
};

export { allActions as actions };
export { reducer } from './slice.js';
