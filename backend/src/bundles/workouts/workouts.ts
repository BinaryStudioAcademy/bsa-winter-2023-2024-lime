import { logger } from '~/common/logger/logger.js';

import { WorkoutController } from './workout.controller.js';
import { WorkoutRepository } from './workout.repository.js';
import { WorkoutService } from './workout.service.js';
import { WorkoutsModel } from './workouts.model.js';

const workoutRepository = new WorkoutRepository(WorkoutsModel);
const workoutService = new WorkoutService(workoutRepository);
const workoutController = new WorkoutController(logger, workoutService);

export { workoutController, workoutService };
export { WorkoutController } from './workout.controller.js';
export { WorkoutEntity } from './workout.entity.js';
export { WorkoutRepository } from './workout.repository.js';
export { WorkoutsModel } from './workouts.model.js';
