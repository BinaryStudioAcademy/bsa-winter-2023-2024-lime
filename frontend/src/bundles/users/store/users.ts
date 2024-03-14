import { getById, loadAll } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    getById,
};

export { allActions as actions };
export { reducer } from './slice.js';
