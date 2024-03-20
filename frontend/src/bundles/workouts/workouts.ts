import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { WorkoutApi } from './workouts-api.js';

const workoutApi = new WorkoutApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { type ValueOf, WorkoutShowLastType } from 'shared';
export { workoutApi };
