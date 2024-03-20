import { type ValueOf } from '../../../types/types.js';
import { type WorkoutShowLastType } from '../workouts.js';

type WorkoutShowLastQueryDto = {
    showLast: ValueOf<typeof WorkoutShowLastType>;
};

export { type WorkoutShowLastQueryDto };
