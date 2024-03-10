// import { type AchievementService } from '~/bundles/achievements/achievement.service.js';
// import { type WorkoutResponseDto } from 'shared';

import { type GoalService } from '~/bundles/goals/goal.service.js';
import { workoutService } from '~/bundles/workouts/workouts.js';
import { COMPLETED_GOAL_VALUE } from '~/common/constants/constants.js';
import { calculateGoalProgress } from '~/common/helpers/helpers.js';

class CalculationService {
    // private achievementService: AchievementService;
    private goalService: GoalService;

    public constructor(
        goalService: GoalService,
        // achievementService: AchievementService,
    ) {
        // this.achievementService = achievementService;
        this.goalService = goalService;
    }

    public async changeGoal(
        userId: number,
        // workout: WorkoutResponseDto,
    ): Promise<void> {
        await this.updateGoalProgress(userId);
    }

    private async updateGoalProgress(
        userId: number,
        // workout: WorkoutResponseDto,
    ): Promise<void> {
        const { items: goals } = await this.goalService.findAll({ userId });
        const { items: workouts } = await workoutService.findAll({ userId });

        // for (const goal of goals) {
        //     if (
        //         goal.activityType === workout.activityType &&
        //         goal.progress < COMPLETED_GOAL_VALUE
        //     ) {
        //         await this.goalService.update(
        //             { id: goal.id },
        //             {
        //                 ...goal,
        //                 userId,
        //                 progress: calculateGoalProgress(goal, workout),
        //                 completedAt:
        //                     calculateGoalProgress(goal, workout) ===
        //                     COMPLETED_GOAL_VALUE
        //                         ? new Date().toISOString()
        //                         : null,
        //             },
        //         );
        //     }
        // }

        for (const goal of goals) {
            const filteredWorkouts = workouts.filter(
                (workout) => workout.activityType === goal.activityType,
            );

            await this.goalService.update(
                { id: goal.id },
                {
                    ...goal,
                    userId,
                    progress: calculateGoalProgress(goal, filteredWorkouts),
                    completedAt:
                        calculateGoalProgress(goal, filteredWorkouts) ===
                        COMPLETED_GOAL_VALUE
                            ? new Date().toISOString()
                            : null,
                },
            );
        }
    }
}

export { CalculationService };
