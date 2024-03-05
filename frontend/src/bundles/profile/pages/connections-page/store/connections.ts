import { authorize, deauthorize, getAll } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    authorize,
    deauthorize,
    getAll,
};

export { allActions as actions };
export { reducer } from './slice.js';
