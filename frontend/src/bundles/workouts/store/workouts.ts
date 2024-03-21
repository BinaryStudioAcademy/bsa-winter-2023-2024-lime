import {
    createWorkout,
    deleteWorkout,
    getLastWorkoutsByUserId,
    getWorkouts,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getWorkouts,
    getLastWorkoutsByUserId,
    createWorkout,
    deleteWorkout,
};

export { allActions as actions };
export { reducer } from './slice.js';
