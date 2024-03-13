import {
    type ActivityType,
    type ValueOf,
    type WorkoutResponseDto,
} from 'shared';

function filterWorkoutsByActivityType(
    array: WorkoutResponseDto[],
    activityType: ValueOf<typeof ActivityType>,
): WorkoutResponseDto[] {
    return array.filter((item) => item.activityType === activityType);
}

export { filterWorkoutsByActivityType };
