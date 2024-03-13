import { type WorkoutResponseDto } from 'shared';

import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import {
    WalkingAchievementDistance,
    WalkingAchievementName,
} from '~/common/enums/enums.js';
import {
    calculateTotalDistance,
    calculateTotalDuration,
    filterMonthWorkouts,
    filterWeekendWorkouts,
} from '~/common/helpers/helpers.js';

const ZERO_VALUE = 0;

function checkWalkingAchievements(
    workouts: WorkoutResponseDto[],
    achievement: AchievementEntity,
): boolean {
    const totalDistance = calculateTotalDistance(workouts);

    const dayWorkout = workouts.filter(
        (workout) =>
            (workout.workoutEndedAt as Date).getDate() === new Date().getDate(),
    );
    const dayTotalSteps = dayWorkout.reduce(
        (accumulator, workout) => accumulator + (workout.steps as number),
        0,
    );

    const weekendWorkout = filterWeekendWorkouts(workouts);
    const weekendWorkoutDuration = calculateTotalDuration(weekendWorkout);
    const monthWorkout = filterMonthWorkouts(workouts);
    const monthWorkoutDistance = calculateTotalDistance(monthWorkout);

    switch (achievement.toObject().name) {
        case WalkingAchievementName.FIRST_FIVE: {
            return dayTotalSteps >= WalkingAchievementDistance.FIVE;
        }
        case WalkingAchievementName.FIRST_TEN: {
            return dayTotalSteps >= WalkingAchievementDistance.TEN;
        }
        case WalkingAchievementName.FIRST_FIFTEEN: {
            return dayTotalSteps >= WalkingAchievementDistance.FIFTEEN;
        }
        case WalkingAchievementName.STEPS_BY_WEEK: {
            return workouts.every(
                (workout) => workout.steps === WalkingAchievementDistance.TEN,
            );
        }
        case WalkingAchievementName.PER_WEEKEND: {
            return weekendWorkoutDuration >= 5;
        }
        case WalkingAchievementName.HUNDRED_PER_MONTH: {
            return monthWorkoutDistance >= WalkingAchievementDistance.HUNDRED;
        }
        case WalkingAchievementName.DISTANCE_WALK: {
            return totalDistance >= WalkingAchievementDistance.TEN;
        }
        case WalkingAchievementName.CALORIES_PER_WALK: {
            return (
                workouts.filter((workout) => workout.kilocalories === 500)
                    .length > ZERO_VALUE
            );
        }
        default: {
            return false;
        }
    }
}

export { checkWalkingAchievements };
