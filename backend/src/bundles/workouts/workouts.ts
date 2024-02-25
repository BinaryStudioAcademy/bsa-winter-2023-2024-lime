import { logger } from '~/common/logger/logger.js';

import { UserWorkoutsModel } from './user-workouts.model.js';
import { WorkoutController } from './workout.controller.js';
import { WorkoutRepository } from './workout.repository.js';
import { WorkoutService } from './workout.service.js';

const workoutRepository = new WorkoutRepository(UserWorkoutsModel);
const workoutService = new WorkoutService(workoutRepository);
const workoutController = new WorkoutController(logger, workoutService);

export { workoutController, workoutService };
export { UserWorkoutsModel } from './user-workouts.model.js';
export { WorkoutController } from './workout.controller.js';
export { WorkoutEntity } from './workout.entity.js';
export { WorkoutRepository } from './workout.repository.js';
