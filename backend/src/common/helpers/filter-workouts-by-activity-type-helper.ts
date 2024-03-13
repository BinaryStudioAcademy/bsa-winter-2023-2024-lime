import {
    type ActivityType,
    type ValueOf,
} from '~/bundles/achievements/enums/enums.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

function filterWorkoutsByActivityType(
    array: WorkoutResponseDto[],
    activityType: ValueOf<typeof ActivityType>,
): WorkoutResponseDto[] {
    return array.filter((item) => item.activityType === activityType);
}

export { filterWorkoutsByActivityType };
