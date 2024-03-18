import {
    createWorkout,
    getLastWorkoutsByUserId,
    getWorkouts,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getWorkouts,
    getLastWorkoutsByUserId,
    createWorkout,
};

export { allActions as actions };
export { reducer } from './slice.js';
