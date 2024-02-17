import { passwordForgot } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    passwordForgot,
};

export { allActions as actions };
export { reducer } from './slice.js';
