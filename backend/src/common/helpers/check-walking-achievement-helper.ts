import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';
import {
    WalkingAchievementDistance,
    WalkingAchievementName,
} from '~/common/enums/enums.js';
import {
    calculateTotalDistance,
    calculateTotalDuration,
    checkAchievementUniqueness,
    filterMonthWorkouts,
    filterWeekendWorkouts,
} from '~/common/helpers/helpers.js';

const WORKOUT_DURATION = 5;
const CALORIES_VALUE = 500;

type Properties = {
    workouts: WorkoutResponseDto[];
    achievement: AchievementEntity;
    lastWorkout: WorkoutResponseDto;
    userAchievementsListById: number[] | undefined;
};

function checkWalkingAchievements({
    workouts,
    achievement,
    lastWorkout,
    userAchievementsListById,
}: Properties): boolean {
    if (workouts.length === 0) {
        return false;
    }

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
            return (
                dayTotalSteps >= WalkingAchievementDistance.FIVE &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case WalkingAchievementName.FIRST_TEN: {
            return (
                dayTotalSteps >= WalkingAchievementDistance.TEN &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case WalkingAchievementName.FIRST_FIFTEEN: {
            return (
                dayTotalSteps >= WalkingAchievementDistance.FIFTEEN &&
                !checkAchievementUniqueness(
                    achievement.toObject().id,
                    userAchievementsListById,
                )
            );
        }
        case WalkingAchievementName.STEPS_BY_WEEK: {
            return workouts.every(
                (workout) => workout.steps === WalkingAchievementDistance.TEN,
            );
        }
        case WalkingAchievementName.PER_WEEKEND: {
            const workoutQuantity = userAchievementsListById?.filter(
                (item) => item === achievement.toObject().id,
            ).length as number;

            const weekendWorkoutDurationToCheck =
                weekendWorkoutDuration - WORKOUT_DURATION * workoutQuantity;

            return weekendWorkoutDurationToCheck >= WORKOUT_DURATION;
        }
        case WalkingAchievementName.HUNDRED_PER_MONTH: {
            const workoutQuantity = userAchievementsListById?.filter(
                (item) => item === achievement.toObject().id,
            ).length as number;

            const monthWorkoutDistanceToCheck =
                monthWorkoutDistance -
                WalkingAchievementDistance.HUNDRED * workoutQuantity;

            return (
                monthWorkoutDistanceToCheck >=
                WalkingAchievementDistance.HUNDRED
            );
        }
        case WalkingAchievementName.DISTANCE_WALK: {
            return lastWorkout.distance >= WalkingAchievementDistance.TEN;
        }
        case WalkingAchievementName.CALORIES_PER_WALK: {
            return lastWorkout.kilocalories >= CALORIES_VALUE;
        }
        default: {
            return false;
        }
    }
}

export { checkWalkingAchievements };
