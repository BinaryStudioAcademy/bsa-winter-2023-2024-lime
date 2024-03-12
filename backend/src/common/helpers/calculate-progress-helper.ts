import {
    type GoalResponseDto,
    type WorkoutResponseDto,
    FrequencyType,
} from 'shared';

import {
    COMPLETED_GOAL_VALUE,
    PERSENTAGE_MULTIPLIER,
} from '~/common/constants/constants.js';

const WEEK_DAYS = 7;
const ZERO_VALUE = 0;

function calculateProgress(
    goal: GoalResponseDto,
    workouts: WorkoutResponseDto[],
): number {
    const workoutsByFrequency = workouts.slice(ZERO_VALUE, goal.frequency);

    if (goal.distance) {
        return Math.round(
            (workoutsByFrequency.reduce(
                (accumulator, workout) => accumulator + workout.distance,
                ZERO_VALUE,
            ) /
                goal.distance) *
                PERSENTAGE_MULTIPLIER,
        );
    } else if (goal.duration) {
        return Math.round(
            (workoutsByFrequency.reduce(
                (accumulator, workout) => accumulator + workout.duration,
                ZERO_VALUE,
            ) /
                goal.duration) *
                PERSENTAGE_MULTIPLIER,
        );
    }
    return goal.progress;
}

function calculateGoalProgress(
    goal: GoalResponseDto,
    workouts: WorkoutResponseDto[],
): number {
    let progress = goal.progress;
    const goalDate = new Date(goal?.createdAt as string);

    switch (goal.frequencyType) {
        case FrequencyType.DAY: {
            const todayWorkouts = workouts.filter(
                (workout) =>
                    (workout.workoutEndedAt as Date) >= goalDate &&
                    workout.workoutEndedAt?.getDate() === goalDate.getDate(),
            );

            progress = calculateProgress(goal, todayWorkouts);

            break;
        }
        case FrequencyType.WEEK: {
            const weekWorkout = workouts.filter(
                (workout) =>
                    (workout.workoutEndedAt as Date) >= goalDate &&
                    (workout.workoutEndedAt?.getDate() as number) <=
                        goalDate.getDate() + WEEK_DAYS,
            );

            progress = calculateProgress(goal, weekWorkout);
            break;
        }
    }
    return progress > COMPLETED_GOAL_VALUE ? COMPLETED_GOAL_VALUE : progress;
}

export { calculateGoalProgress };
