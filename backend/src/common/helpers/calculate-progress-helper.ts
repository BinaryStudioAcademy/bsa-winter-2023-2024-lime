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

// function calculateProgress(
//     goal: GoalResponseDto,
//     workout: WorkoutResponseDto,
// ): number {
//     if (goal.distance) {
//         return Math.round(
//             (workout.distance / goal.distance) * PERSENTAGE_MULTIPLIER,
//         );
//     } else if (goal.duration) {
//         return Math.round(
//             (workout.duration / goal.duration) * PERSENTAGE_MULTIPLIER,
//         );
//     }
//     return goal.progress;
// }

// function calculateGoalProgress(
//     goal: GoalResponseDto,
//     workout: WorkoutResponseDto,
// ): number {
//     let progress = goal.progress;
//     const today = new Date();

//     switch (goal.frequencyType) {
//         case FrequencyType.DAY: {
//             if (workout.workoutEndedAt?.getDate() === today.getDate()) {
//                 progress = calculateProgress(goal, workout);
//             }

//             break;
//         }
//         case FrequencyType.WEEK: {
//             if (
//                 (workout.workoutEndedAt?.getDate() as number) <=
//                     today.getDate() &&
//                 (workout.workoutEndedAt?.getDate() as number) >=
//                     today.getDate() - WEEK_DAYS
//             ) {
//                 progress = calculateProgress(goal, workout);
//             }

//             break;
//         }
//     }
//     return goal.progress + progress > COMPLETED_GOAL_VALUE
//         ? COMPLETED_GOAL_VALUE
//         : goal.progress + progress;
// }

function calculateProgress(
    goal: GoalResponseDto,
    workouts: WorkoutResponseDto[],
): number {
    const workoutSlice = workouts.slice(ZERO_VALUE, goal.frequency);

    if (goal.distance) {
        return Math.round(
            (workoutSlice.reduce(
                (accumulator, workout) => accumulator + workout.distance,
                ZERO_VALUE,
            ) /
                goal.distance) *
                PERSENTAGE_MULTIPLIER,
        );
    } else if (goal.duration) {
        return Math.round(
            (workoutSlice.reduce(
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
    const today = new Date();

    switch (goal.frequencyType) {
        case FrequencyType.DAY: {
            const todayWorkouts = workouts.filter(
                (workout) =>
                    workout.workoutEndedAt?.getDate() === today.getDate(),
            );

            progress = calculateProgress(goal, todayWorkouts);

            break;
        }
        case FrequencyType.WEEK: {
            const weekWorkout = workouts.filter(
                (workout) =>
                    (workout.workoutEndedAt?.getDate() as number) <=
                        today.getDate() &&
                    (workout.workoutEndedAt?.getDate() as number) >=
                        today.getDate() - WEEK_DAYS,
            );

            progress = calculateProgress(goal, weekWorkout);
            break;
        }
    }
    return progress > COMPLETED_GOAL_VALUE ? COMPLETED_GOAL_VALUE : progress;
}

export { calculateGoalProgress };
