import {
    type ActivityType,
    type ValueOf,
    type WorkoutResponseDto,
} from 'shared';

import { CyclingAchievementDistance } from '~/common/enums/cycling-achievement-distance.enum.js';
import { CyclingAchievementName } from '~/common/enums/cycling-achievement-name.enum.js';

type Achievement = {
    name: string;
    activityType: ValueOf<typeof ActivityType>;
    requirement: number;
    requirementMetric: string;
};

function checkCyclingAchievements(
    workouts: WorkoutResponseDto[],
    achievement: Achievement,
): boolean {
    const totalDistance = workouts.reduce(
        (accumulator, workout) => accumulator + workout.distance,
        0,
    );
    const averageSpeed =
        workouts.reduce(
            (accumulator, workout) => accumulator + workout.speed,
            0,
        ) / workouts.length;

    const monthWorkout = workouts.filter(
        (workout) =>
            (workout.workoutEndedAt as Date).getMonth() ===
            new Date().getMonth(),
    );
    const monthWorkoutDistance = monthWorkout.reduce(
        (accumulator, workout) => accumulator + workout.distance,
        0,
    );

    const weekendWorkout = workouts.filter(
        (workout) =>
            (workout.workoutEndedAt as Date).getDay() === 0 ||
            (workout.workoutEndedAt as Date).getDay() === 6,
    );
    const weekendWorkoutDuration = weekendWorkout.reduce(
        (accumulator, workout) => accumulator + workout.duration,
        0,
    );

    switch (achievement.name) {
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
            return weekendWorkoutDuration >= 120;
        }
        case CyclingAchievementName.AVERAGE_SPEED: {
            return (
                totalDistance >= CyclingAchievementDistance.TWENTY &&
                averageSpeed >= 25
            );
        }
        default: {
            return false;
        }
    }
}

export { checkCyclingAchievements };
