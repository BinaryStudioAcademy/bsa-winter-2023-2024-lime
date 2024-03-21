import { FrequencyType } from '~/bundles/goals/enums/enums.js';
import { type GoalResponseDto } from '~/bundles/goals/types/types.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';
import {
    COMPLETED_GOAL_VALUE,
    PERSENTAGE_MULTIPLIER,
} from '~/common/constants/constants.js';
import { convertSecondsToMinutes } from '~/common/helpers/helpers.js';

const WEEK_DAYS = 7;
const MONTH_VALUE = 1;

const checkGoal = (
    workout: WorkoutResponseDto,
    goal: GoalResponseDto,
): boolean | undefined => {
    let isMatched = true;

    if (goal.distance) {
        isMatched = workout.distance >= goal.distance;
    }

    if (isMatched && goal.duration) {
        isMatched = convertSecondsToMinutes(workout.duration) >= goal.duration;
    }

    return isMatched;
};

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
                    workout.workoutEndedAt &&
                    workout.workoutEndedAt >= goalDate &&
                    workout.workoutEndedAt?.getDate() === goalDate.getDate() &&
                    checkGoal(workout, goal),
            );

            progress = Math.round(
                (todayWorkouts.length / goal.frequency) * PERSENTAGE_MULTIPLIER,
            );

            break;
        }
        case FrequencyType.WEEK: {
            const weekWorkouts = workouts.filter(
                (workout) =>
                    workout.workoutEndedAt &&
                    workout.workoutEndedAt >= goalDate &&
                    workout.workoutEndedAt?.getDate() <=
                        goalDate.getDate() + WEEK_DAYS &&
                    checkGoal(workout, goal),
            );

            progress = Math.round(
                (weekWorkouts.length / goal.frequency) * PERSENTAGE_MULTIPLIER,
            );

            break;
        }
        case FrequencyType.MONTH: {
            const monthWorkouts = workouts.filter(
                (workout) =>
                    workout.workoutEndedAt &&
                    workout.workoutEndedAt >= goalDate &&
                    workout.workoutEndedAt?.setMonth(
                        workout.workoutEndedAt.getMonth(),
                    ) <= goalDate.setMonth(goalDate.getMonth() + MONTH_VALUE) &&
                    checkGoal(workout, goal),
            );

            progress = Math.round(
                (monthWorkouts.length / goal.frequency) * PERSENTAGE_MULTIPLIER,
            );

            break;
        }
    }
    return progress > COMPLETED_GOAL_VALUE ? COMPLETED_GOAL_VALUE : progress;
}

export { calculateGoalProgress };
