import { signIn, signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    signIn,
};

export { allActions as actions };
export { reducer } from './slice.js';
