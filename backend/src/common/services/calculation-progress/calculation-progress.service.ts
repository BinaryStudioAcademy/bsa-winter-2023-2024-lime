import { type AchievementService } from '~/bundles/achievements/achievement.service.js';
import { type UserAchievementService } from '~/bundles/achievements/user-achievement.service.js';
import { type GoalService } from '~/bundles/goals/goal.service.js';
import { type GoalResponseDto } from '~/bundles/goals/types/types.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';
import { workoutService } from '~/bundles/workouts/workouts.js';
import { COMPLETED_GOAL_VALUE } from '~/common/constants/constants.js';
import { ActivityType } from '~/common/enums/enums.js';
import {
    calculateGoalProgress,
    checkAchievementUniqueness,
    checkCyclingAchievements,
    checkRunningAchievements,
    checkWalkingAchievements,
    filterAchievementByActivityType,
    filterWorkoutsByActivityType,
} from '~/common/helpers/helpers.js';

class CalculationProgressService {
    private achievementService: AchievementService;
    private goalService: GoalService;
    private userAchievementsService: UserAchievementService;

    public constructor(
        goalService: GoalService,
        achievementService: AchievementService,
        userAchievementsService: UserAchievementService,
    ) {
        this.achievementService = achievementService;
        this.goalService = goalService;
        this.userAchievementsService = userAchievementsService;
    }

    public async calculateProgress(userId: number): Promise<void> {
        const { items: goals } = await this.goalService.findAll({ userId });
        const { items: workouts } = await workoutService.findAll({ userId });

        await this.updateGoal(userId, goals, workouts);
        await this.updateAchievement(userId, workouts);
    }

    private async updateGoal(
        userId: number,
        goals: GoalResponseDto[],
        workouts: WorkoutResponseDto[],
    ): Promise<void> {
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

    private async updateAchievement(
        userId: number,
        workouts: WorkoutResponseDto[],
    ): Promise<void> {
        const achievementsList = await this.achievementService.findAll();
        const userAchievementsList =
            await this.achievementService.findByUserId(userId);
        const userAchievementsListById = userAchievementsList?.map(
            (item) => item.toObject().id,
        );

        const userAchievements = [];

        const cyclingWorkouts = filterWorkoutsByActivityType(
            workouts,
            ActivityType.CYCLING,
        );
        const cyclingAchievements = filterAchievementByActivityType(
            achievementsList,
            ActivityType.CYCLING,
        );
        const userCyclingAchievements = cyclingAchievements
            .filter((achievement) =>
                checkCyclingAchievements(cyclingWorkouts, achievement),
            )
            .map((item) => item.toObject().id);
        const uniqueCyclingAchievements = checkAchievementUniqueness(
            userCyclingAchievements,
            userAchievementsListById,
        );

        userAchievements.push(...uniqueCyclingAchievements);

        const runningWorkouts = filterWorkoutsByActivityType(
            workouts,
            ActivityType.RUNNING,
        );
        const runningAchievements = filterAchievementByActivityType(
            achievementsList,
            ActivityType.RUNNING,
        );
        const userRunningAchievements = runningAchievements
            .filter((achievement) =>
                checkRunningAchievements(runningWorkouts, achievement),
            )
            .map((item) => item.toObject().id);
        const uniqueRunningAchievements = checkAchievementUniqueness(
            userRunningAchievements,
            userAchievementsListById,
        );
        userAchievements.push(...uniqueRunningAchievements);

        const walkingWorkouts = filterWorkoutsByActivityType(
            workouts,
            ActivityType.WALKING,
        );
        const walkingAchievements = filterAchievementByActivityType(
            achievementsList,
            ActivityType.WALKING,
        );
        const userWalkingAchievements = walkingAchievements
            .filter((achievement) =>
                checkWalkingAchievements(walkingWorkouts, achievement),
            )
            .map((item) => item.toObject().id);

        const uniqueWalkingAchievements = checkAchievementUniqueness(
            userWalkingAchievements,
            userAchievementsListById,
        );

        userAchievements.push(...uniqueWalkingAchievements);

        for (const achievement of userAchievements) {
            await this.userAchievementsService.create({
                userId,
                achievementId: achievement,
            });
        }
    }
}

export { CalculationProgressService };
