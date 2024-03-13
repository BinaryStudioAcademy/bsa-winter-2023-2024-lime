import { type WorkoutResponseDto } from 'shared';

import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import {
    CyclingAchievementDistance,
    CyclingAchievementName,
} from '~/common/enums/enums.js';
import {
    calculateTotalDistance,
    calculateTotalDuration,
    filterMonthWorkouts,
    filterWeekendWorkouts,
} from '~/common/helpers/helpers.js';

const HOUR = 60;
const TWICE = 2;
const AVERAGE_SPEED = 25;

function checkCyclingAchievements(
    workouts: WorkoutResponseDto[],
    achievement: AchievementEntity,
): boolean {
    const totalDistance = calculateTotalDistance(workouts);
    const averageSpeed =
        workouts.reduce(
            (accumulator, workout) => accumulator + workout.speed,
            0,
        ) / workouts.length;

    const monthWorkout = filterMonthWorkouts(workouts);
    const monthWorkoutDistance = calculateTotalDistance(monthWorkout);

    const weekendWorkout = filterWeekendWorkouts(workouts);
    const weekendWorkoutDuration = calculateTotalDuration(weekendWorkout);

    switch (achievement.toObject().name) {
        case CyclingAchievementName.FIRST: {
            return totalDistance >= CyclingAchievementDistance.FIVE;
        }
        case CyclingAchievementName.TWENTY_JOURNEY: {
            return totalDistance >= CyclingAchievementDistance.TWENTY;
        }
        case CyclingAchievementName.FIFTY_JOURNEY: {
            return totalDistance >= CyclingAchievementDistance.FIFTY;
        }
        case CyclingAchievementName.TWO_HUNDREDS_PER_MONTH: {
            return (
                monthWorkoutDistance >= CyclingAchievementDistance.TWO_HUNDREDS
            );
        }
        case CyclingAchievementName.THREE_HUNDREDS_PER_MONTH: {
            return (
                monthWorkoutDistance >=
                CyclingAchievementDistance.THREE_HUNDREDS
            );
        }
        case CyclingAchievementName.DURATION_PER_WEEKEND: {
            return weekendWorkoutDuration >= TWICE * HOUR;
        }
        case CyclingAchievementName.AVERAGE_SPEED: {
            return (
                totalDistance >= CyclingAchievementDistance.TWENTY &&
                averageSpeed >= AVERAGE_SPEED
            );
        }
        default: {
            return false;
        }
    }
}

export { checkCyclingAchievements };
