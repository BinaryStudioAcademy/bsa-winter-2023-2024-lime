import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';
import {
    RunningAchievementDistance,
    RunningAchievementName,
} from '~/common/enums/enums.js';
import {
    calculateTotalDistance,
    calculateTotalDuration,
    filterMonthWorkouts,
    filterWeekendWorkouts,
} from '~/common/helpers/helpers.js';

function checkRunningAchievements(
    workouts: WorkoutResponseDto[],
    achievement: AchievementEntity,
): boolean {
    const totalDistance = calculateTotalDistance(workouts);
    const totalDuration = calculateTotalDuration(workouts);
    const monthWorkout = filterMonthWorkouts(workouts);
    const monthWorkoutDistance = calculateTotalDistance(monthWorkout);
    const weekendWorkout = filterWeekendWorkouts(workouts);
    const weekendWorkoutDistance = calculateTotalDistance(weekendWorkout);

    switch (achievement.toObject().name) {
        case RunningAchievementName.FIRST_ONE: {
            return totalDistance >= RunningAchievementDistance.ONE;
        }
        case RunningAchievementName.FIRST_FIVE: {
            return totalDistance >= RunningAchievementDistance.FIVE;
        }
        case RunningAchievementName.FIRST_TEN: {
            return totalDistance >= RunningAchievementDistance.TEN;
        }
        case RunningAchievementName.FIRST_HALF_MARATHON: {
            return totalDistance >= RunningAchievementDistance.HALF_MARATHON;
        }
        case RunningAchievementName.FIRST_MARATHON: {
            return totalDistance >= RunningAchievementDistance.MARATHON;
        }
        case RunningAchievementName.FIRST_HALF_HOUR: {
            return totalDuration >= 30;
        }
        case RunningAchievementName.HUNDRED_PER_MONTH: {
            return monthWorkoutDistance >= RunningAchievementDistance.HUNDRED;
        }
        case RunningAchievementName.PER_WEEKEND: {
            return weekendWorkoutDistance >= RunningAchievementDistance.TEN;
        }
        case RunningAchievementName.QUANTITY_PER_MONTH: {
            return monthWorkout.length >= 20;
        }
        default: {
            return false;
        }
    }
}

export { checkRunningAchievements };
