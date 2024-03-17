import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';
import {
    RunningAchievementDistance,
    RunningAchievementName,
} from '~/common/enums/enums.js';
import {
    calculateTotalDistance,
    checkAchievementUniqueness,
    filterMonthWorkouts,
    filterWeekendWorkouts,
} from '~/common/helpers/helpers.js';

const HALF_HOUR = 30;
const WORKOUTS_QUANTITY = 20;

type Properties = {
    workouts: WorkoutResponseDto[];
    achievement: AchievementEntity;
    lastWorkout: WorkoutResponseDto;
    userAchievementsListById: number[] | undefined;
};

function checkRunningAchievements({
    workouts,
    achievement,
    lastWorkout,
    userAchievementsListById,
}: Properties): boolean {
    if (workouts.length === 0) {
        return false;
    }

    const monthWorkout = filterMonthWorkouts(workouts);
    const monthWorkoutDistance = calculateTotalDistance(monthWorkout);
    const weekendWorkout = filterWeekendWorkouts(workouts);
    const weekendWorkoutDistance = calculateTotalDistance(weekendWorkout);

    switch (achievement.toObject().name) {
        case RunningAchievementName.FIRST_ONE: {
            return (
                lastWorkout.distance >= RunningAchievementDistance.ONE &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case RunningAchievementName.FIRST_FIVE: {
            return (
                lastWorkout.distance >= RunningAchievementDistance.FIVE &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case RunningAchievementName.FIRST_TEN: {
            return (
                lastWorkout.distance >= RunningAchievementDistance.TEN &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case RunningAchievementName.FIRST_HALF_MARATHON: {
            return (
                lastWorkout.distance >=
                    RunningAchievementDistance.HALF_MARATHON &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case RunningAchievementName.FIRST_MARATHON: {
            return (
                lastWorkout.distance >= RunningAchievementDistance.MARATHON &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case RunningAchievementName.FIRST_HALF_HOUR: {
            return (
                lastWorkout.duration >= HALF_HOUR &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case RunningAchievementName.HUNDRED_PER_MONTH: {
            const workoutQuantity = userAchievementsListById?.filter(
                (item) => item === achievement.toObject().id,
            ).length as number;

            const monthWorkoutDistanceToCheck =
                monthWorkoutDistance -
                RunningAchievementDistance.HUNDRED * workoutQuantity;

            return (
                monthWorkoutDistanceToCheck >=
                RunningAchievementDistance.HUNDRED
            );
        }
        case RunningAchievementName.PER_WEEKEND: {
            return weekendWorkoutDistance >= RunningAchievementDistance.TEN;
        }
        case RunningAchievementName.QUANTITY_PER_MONTH: {
            return monthWorkout.length >= WORKOUTS_QUANTITY;
        }
        default: {
            return false;
        }
    }
}

export { checkRunningAchievements };
