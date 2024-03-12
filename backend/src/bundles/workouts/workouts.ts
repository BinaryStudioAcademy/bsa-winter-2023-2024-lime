import { logger } from '~/common/logger/logger.js';

import { WorkoutController } from './workout.controller.js';
import { WorkoutModel } from './workout.model.js';
import { WorkoutRepository } from './workout.repository.js';
import { WorkoutService } from './workout.service.js';

const workoutRepository = new WorkoutRepository(WorkoutModel);
const workoutService = new WorkoutService(workoutRepository);
const workoutController = new WorkoutController(logger, workoutService);

export { workoutController, workoutService };
export { WorkoutController } from './workout.controller.js';
export { WorkoutEntity } from './workout.entity.js';
export { WorkoutModel } from './workout.model.js';
export { WorkoutRepository } from './workout.repository.js';
