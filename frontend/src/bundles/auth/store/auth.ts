import {
    authorizeIdentity,
    logout,
    refreshUser,
    signIn,
    signInIdentity,
    signUp,
    updateUser,
    uploadAvatar,
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
    uploadAvatar,
};

export { allActions as actions };
export { reducer } from './slice.js';
