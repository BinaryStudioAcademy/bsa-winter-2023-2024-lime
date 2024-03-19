import { type AchievementService } from '~/bundles/achievements/achievement.service.js';
import { type ValueOf, Metric } from '~/bundles/achievements/enums/enums.js';
import { type UserAchievementService } from '~/bundles/achievements/user-achievement.service.js';
import { type GoalService } from '~/bundles/goals/goal.service.js';
import { type NotificationService } from '~/bundles/notifications/notification.service.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';
import { workoutService } from '~/bundles/workouts/workouts.js';
import { COMPLETED_GOAL_VALUE } from '~/common/constants/constants.js';
import { NotificationMessage } from '~/common/enums/enums.js';
import {
    calculateGoalProgress,
    convertMetersToKilometers,
} from '~/common/helpers/helpers.js';

class CalculationProgressService {
    private achievementService: AchievementService;
    private goalService: GoalService;
    private userAchievementsService: UserAchievementService;
    private notificationService: NotificationService;

    public constructor({
        goalService,
        achievementService,
        userAchievementService,
        notificationService,
    }: {
        goalService: GoalService;
        achievementService: AchievementService;
        userAchievementService: UserAchievementService;
        notificationService: NotificationService;
    }) {
        this.achievementService = achievementService;
        this.goalService = goalService;
        this.userAchievementsService = userAchievementService;
        this.notificationService = notificationService;
    }

    public async calculateProgress(
        userId: number,
        lastWorkout: WorkoutResponseDto,
    ): Promise<void> {
        await this.updateGoal(userId, lastWorkout);
        await this.updateAchievement(userId, lastWorkout);
    }

    private async updateGoal(
        userId: number,
        lastWorkout: WorkoutResponseDto,
    ): Promise<void> {
        let hasCompletedGoal = false;

        const { items: goals } = await this.goalService.findAll({
            userId,
        });
        const { items: workouts } = await workoutService.findAll({
            userId,
        });

        const filteredGoals = goals.filter(
            (goal) => goal.activityType === lastWorkout.activityType,
        );

        const filteredWorkouts = workouts.filter(
            (workout) => workout.activityType === lastWorkout.activityType,
        );

        for (const goal of filteredGoals) {
            const updatedGoal = await this.goalService.update(
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

            if (
                calculateGoalProgress(goal, filteredWorkouts) ===
                    COMPLETED_GOAL_VALUE &&
                updatedGoal
            ) {
                hasCompletedGoal = true;
            }
        }

        if (hasCompletedGoal) {
            await this.notificationService.create({
                userId,
                title: 'Goal Completed',
                message: NotificationMessage.GOAL_COMPLETED,
                isRead: false,
                type: 'default',
            });
        }
    }

    private async updateAchievement(
        userId: number,
        lastWorkout: WorkoutResponseDto,
    ): Promise<void> {
        const { items: workouts } = await workoutService.findAll({
            userId,
        });
        const achievementsList = await this.achievementService.findAll();
        const userAchievementsList =
            await this.achievementService.findByUserId(userId);
        const userAchievementsListById = userAchievementsList?.map(
            (item) => item.toObject().id,
        );

        const uncomlietedAchievements = achievementsList.filter(
            (achievement) =>
                !userAchievementsListById?.includes(achievement.toObject().id),
        );

        const filteredAchievementsByLastWorkoutType =
            uncomlietedAchievements.filter(
                (achievement) =>
                    achievement.toObject().activityType ===
                    lastWorkout.activityType,
            );

        const filteredWorkoutsByLastWorkoutType = workouts.filter(
            (workout) => workout.activityType === lastWorkout.activityType,
        );

        const totalDistance = filteredWorkoutsByLastWorkoutType.reduce(
            (accumulator, workout) => accumulator + workout.distance,
            0,
        );
        const totalDuration = filteredWorkoutsByLastWorkoutType.reduce(
            (accumulator, workout) => accumulator + workout.duration,
            0,
        );
        const totalSteps = filteredWorkoutsByLastWorkoutType.reduce(
            (accumulator, workout) => accumulator + (workout.steps as number),
            0,
        );
        const totalKilocalories = filteredWorkoutsByLastWorkoutType.reduce(
            (accumulator, workout) => accumulator + workout.kilocalories,
            0,
        );

        const requirementsByMetric: Record<ValueOf<typeof Metric>, number> = {
            [Metric.KILOMETERS]: convertMetersToKilometers(totalDistance),
            [Metric.MINUTES]: totalDuration,
            [Metric.STEPS]: totalSteps,
            [Metric.KILOCALORIES]: totalKilocalories,
        };

        const userAchievements = filteredAchievementsByLastWorkoutType.filter(
            (achievement) =>
                requirementsByMetric[
                    achievement.toObject().requirementMetric as ValueOf<
                        typeof Metric
                    >
                ] >= achievement.toObject().requirement,
        );

        for (const achievement of userAchievements) {
            const newAchievemenet = await this.userAchievementsService.create({
                userId,
                achievementId: achievement.toObject().id,
            });
            if (newAchievemenet) {
                const achievementDetails =
                    await this.achievementService.findById(
                        achievement.toObject().id,
                    );

                if (achievementDetails) {
                    await this.notificationService.create({
                        userId,
                        title: 'New Achievement',
                        message: `${NotificationMessage.NEW_ACHIEVEMENT} ${achievementDetails.toObject().name}.`,
                        isRead: false,
                        type: 'default',
                    });
                }
            }
        }
    }
}

export { CalculationProgressService };
