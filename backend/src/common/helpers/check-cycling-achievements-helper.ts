import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';
import {
    CyclingAchievementDistance,
    CyclingAchievementName,
} from '~/common/enums/enums.js';
import {
    calculateTotalDistance,
    calculateTotalDuration,
    checkAchievementUniqueness,
    filterMonthWorkouts,
    filterWeekendWorkouts,
} from '~/common/helpers/helpers.js';

const HOUR = 60;
const TWICE = 2;
const AVERAGE_SPEED = 25;

type Properties = {
    workouts: WorkoutResponseDto[];
    achievement: AchievementEntity;
    lastWorkout: WorkoutResponseDto;
    userAchievementsListById: number[] | undefined;
};

function checkCyclingAchievements({
    workouts,
    achievement,
    lastWorkout,
    userAchievementsListById,
}: Properties): boolean {
    const monthWorkout = filterMonthWorkouts(workouts);
    const monthWorkoutDistance = calculateTotalDistance(monthWorkout);

    const weekendWorkout = filterWeekendWorkouts(workouts);
    const weekendWorkoutDuration = calculateTotalDuration(weekendWorkout);

    switch (achievement.toObject().name) {
        case CyclingAchievementName.FIRST: {
            return (
                lastWorkout.distance >= CyclingAchievementDistance.FIVE &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case CyclingAchievementName.TWENTY_JOURNEY: {
            return lastWorkout.distance >= CyclingAchievementDistance.TWENTY;
        }
        case CyclingAchievementName.FIFTY_JOURNEY: {
            return lastWorkout.distance >= CyclingAchievementDistance.FIFTY;
        }
        case CyclingAchievementName.TWO_HUNDREDS_PER_MONTH: {
            const workoutQuantity = userAchievementsListById?.filter(
                (item) => item === achievement.toObject().id,
            ).length as number;

            const monthWorkoutDistanceToCheck =
                monthWorkoutDistance -
                CyclingAchievementDistance.TWO_HUNDREDS * workoutQuantity;

            return (
                monthWorkoutDistanceToCheck >=
                CyclingAchievementDistance.TWO_HUNDREDS
            );
        }
        case CyclingAchievementName.THREE_HUNDREDS_PER_MONTH: {
            const workoutQuantity = userAchievementsListById?.filter(
                (item) => item === achievement.toObject().id,
            ).length as number;

            const monthWorkoutDistanceToCheck =
                monthWorkoutDistance -
                CyclingAchievementDistance.TWO_HUNDREDS * workoutQuantity;

            return (
                monthWorkoutDistanceToCheck >=
                CyclingAchievementDistance.THREE_HUNDREDS
            );
        }
        case CyclingAchievementName.DURATION_PER_WEEKEND: {
            const workoutQuantity = userAchievementsListById?.filter(
                (item) => item === achievement.toObject().id,
            ).length as number;

            const weekendWorkoutDistanceToCheck =
                weekendWorkoutDuration -
                CyclingAchievementDistance.TWO_HUNDREDS * workoutQuantity;

            return weekendWorkoutDistanceToCheck >= TWICE * HOUR;
        }
        case CyclingAchievementName.AVERAGE_SPEED: {
            return (
                lastWorkout.distance >= CyclingAchievementDistance.TWENTY &&
                lastWorkout.speed >= AVERAGE_SPEED
            );
        }
        default: {
            return false;
        }
    }
}

export { checkCyclingAchievements };
