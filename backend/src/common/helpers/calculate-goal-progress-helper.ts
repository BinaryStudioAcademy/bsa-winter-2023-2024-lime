import { FrequencyType } from '~/bundles/goals/enums/enums.js';
import { type GoalResponseDto } from '~/bundles/goals/types/types.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';
import {
    COMPLETED_GOAL_VALUE,
    PERSENTAGE_MULTIPLIER,
} from '~/common/constants/constants.js';

const WEEK_DAYS = 7;

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
                    ((goal.distance && workout.distance >= goal?.distance) ||
                        (goal.duration && workout.duration >= goal?.duration)),
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
                    ((goal.distance && workout.distance >= goal?.distance) ||
                        (goal.duration && workout.duration >= goal?.duration)),
            );

            progress = Math.round(
                (weekWorkouts.length / goal.frequency) * PERSENTAGE_MULTIPLIER,
            );

            break;
        }
    }
    return progress > COMPLETED_GOAL_VALUE ? COMPLETED_GOAL_VALUE : progress;
}

export { calculateGoalProgress };
