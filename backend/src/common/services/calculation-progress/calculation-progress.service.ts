import {
    type GoalResponseDto,
    // type ValueOf,
    type WorkoutResponseDto,
    // ActivityType,
    // Metric,
} from 'shared';

// import { type AchievementService } from '~/bundles/achievements/achievement.service.js';
import { type GoalService } from '~/bundles/goals/goal.service.js';
import { workoutService } from '~/bundles/workouts/workouts.js';
import { COMPLETED_GOAL_VALUE } from '~/common/constants/constants.js';
// import {
//     CyclingAchievementDistance,
//     CyclingAchievementName,
// } from '~/common/enums/enums.js';
import {
    calculateGoalProgress,
    // checkCyclingAchievements,
} from '~/common/helpers/helpers.js';

// type Achievement = {
//     name: string;
//     activityType: ValueOf<typeof ActivityType>;
//     requirement: number;
//     requirementMetric: string;
// };

// const METERS_IN_KILOMETERS = 1000;

// const cyclingAchievements: Achievement[] = [
//     {
//         name: CyclingAchievementName.FIRST,
//         activityType: ActivityType.CYCLING,
//         requirement: CyclingAchievementDistance.FIVE / METERS_IN_KILOMETERS,
//         requirementMetric: Metric.KILOMETERS,
//     },
//     {
//         name: CyclingAchievementName.TWENTY_JOURNEY,
//         activityType: ActivityType.CYCLING,
//         requirement: CyclingAchievementDistance.TWENTY / METERS_IN_KILOMETERS,
//         requirementMetric: Metric.KILOMETERS,
//     },
//     {
//         name: CyclingAchievementName.FIFTY_JOURNEY,
//         activityType: ActivityType.CYCLING,
//         requirement: CyclingAchievementDistance.FIFTY / METERS_IN_KILOMETERS,
//         requirementMetric: Metric.KILOMETERS,
//     },
//     {
//         name: CyclingAchievementName.TWO_HUNDREDS_PER_MONTH,
//         activityType: ActivityType.CYCLING,
//         requirement:
//             CyclingAchievementDistance.TWO_HUNDREDS / METERS_IN_KILOMETERS,
//         requirementMetric: Metric.KILOMETERS,
//     },
//     {
//         name: CyclingAchievementName.THREE_HUNDREDS_PER_MONTH,
//         activityType: ActivityType.CYCLING,
//         requirement:
//             CyclingAchievementDistance.THREE_HUNDREDS / METERS_IN_KILOMETERS,
//         requirementMetric: Metric.KILOMETERS,
//     },
//     {
//         name: CyclingAchievementName.DURATION_PER_WEEKEND,
//         activityType: ActivityType.CYCLING,
//         requirement: 120,
//         requirementMetric: Metric.MINUTES,
//     },
//     {
//         name: CyclingAchievementName.AVERAGE_SPEED,
//         activityType: ActivityType.CYCLING,
//         requirement: 25,
//         requirementMetric: Metric.STEPS,
//     },
// ];

class CalculationProgressService {
    // private achievementService: AchievementService;
    private goalService: GoalService;

    public constructor(
        goalService: GoalService,
        // achievementService: AchievementService,
    ) {
        // this.achievementService = achievementService;
        this.goalService = goalService;
    }

    public async calculateProgress(userId: number): Promise<void> {
        const { items: goals } = await this.goalService.findAll({ userId });
        const { items: workouts } = await workoutService.findAll({ userId });

        await this.updateGoal(userId, goals, workouts);
        // await this.updateAchievement(userId, goals, workouts);
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

    // private async updateAchievement(
    //     userId: number,
    //     goals: GoalResponseDto[],
    //     workouts: WorkoutResponseDto[],
    // ): Promise<void> {
    //     const cyclingWorkouts = workouts.filter(
    //         (workout) => workout.activityType === ActivityType.CYCLING,
    //     );
    // const runningWorkouts = workouts.filter(
    //     (workout) => workout.activityType === ActivityType.RUNNING,
    // );
    // const walkingWorkouts = workouts.filter(
    //     (workout) => workout.activityType === ActivityType.WALKING,
    // );

    // const achievedCyclingAchievements = cyclingAchievements.filter(
    //     (achievement) =>
    //         checkCyclingAchievements(cyclingWorkouts, achievement),
    // );

    // console.log(achievedCyclingAchievements);
    // }
}

export { CalculationProgressService };
