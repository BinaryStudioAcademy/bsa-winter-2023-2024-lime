import {
    ActivityWidget,
    ActivityWidgetColor,
    Card,
    GoogleAds,
    Icon,
    InfoSection,
    Loader,
} from '~/bundles/common/components/components.js';
import {
    IconColor,
    IconName,
} from '~/bundles/common/components/icon/enums/enums.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { GoalCard } from '~/bundles/goals/components/components.js';
import { actions as goalsActions } from '~/bundles/goals/store/goals.js';
import {
    ChartGoalProgress,
    GoalWidget,
} from '~/bundles/overview/components/components.js';
import { GoalTypes } from '~/bundles/overview/components/goal-widget/enums/goal-types.enums.js';
import { actions as schedulesActions } from '~/bundles/schedules/store/schedules.js';
import { actions as workoutsActions } from '~/bundles/workouts/store/workouts.js';

import { CompletedGoalsStatus } from '../enums/enums.js';
import {
    calculateTodayStats,
    classifyGoalsByCompletion,
    defineCompletedGoalsStatus,
    formatScheduleDay,
    formatScheduleTime,
    getCompletedDate,
    sortGoalsByDate,
    sortSchedulesByDate,
} from '../helpers/helpers.js';

const Overview: React.FC = () => {
    const { currentSubscription: isSubscribed } = useAppSelector(
        ({ subscriptions }) => subscriptions,
    );

    const dispatch = useAppDispatch();

    const { goals, dataStatus: goalsDataStatus } = useAppSelector(
        ({ goals }) => goals,
    );

    const { workouts } = useAppSelector(({ workouts }) => workouts);

    const { schedules } = useAppSelector(({ schedules }) => schedules);

    const isLoading = goalsDataStatus === DataStatus.PENDING;
    useEffect(() => {
        void dispatch(goalsActions.getGoals());
        void dispatch(workoutsActions.getWorkouts());
        void dispatch(schedulesActions.getSchedules());
    }, [dispatch]);

    const statistics = useMemo(() => calculateTodayStats(workouts), [workouts]);

    const { completedGoals, incompletedGoals } = useMemo(
        () => classifyGoalsByCompletion(goals),
        [goals],
    );

    const completedGoalsStatus = useMemo(
        () => defineCompletedGoalsStatus(goals, completedGoals),
        [goals, completedGoals],
    );

    const completedGoalsLink = useMemo(
        () =>
            completedGoalsStatus === CompletedGoalsStatus.NO_COMPLETED_GOALS
                ? AppRoute.WORKOUT
                : AppRoute.GOALS,
        [completedGoalsStatus],
    );

    if (isLoading) {
        return <Loader isOverflow />;
    }

    return (
        <div className="w-full max-w-[1136px] flex-1 xl:flex xl:gap-8 2xl:basis-[1136px]">
            <div className="mb-5 xl:basis-[68%]">
                <GoalWidget
                    value={completedGoals.length}
                    target={goals.length}
                    goalType={GoalTypes.OVERVIEW}
                    rightTitle="Completed Goals"
                    className="mb-6"
                    hasAchievement={goals.length > 0}
                />
                <ul className="mb-6 flex flex-col gap-4 min-[600px]:flex-row md:flex-col min-[840px]:flex-row">
                    <li className="flex-1">
                        <ActivityWidget
                            label="Workout"
                            value={`${statistics.workouts} hrs`}
                            color={ActivityWidgetColor.YELLOW}
                            icon={
                                <Icon
                                    name={IconName.workoutIcon}
                                    color={IconColor.SECONDARY}
                                />
                            }
                        />
                    </li>
                    <li className="flex-1">
                        <ActivityWidget
                            label="Calories"
                            value={`${statistics.kilocalories} kcl`}
                            color={ActivityWidgetColor.MAGENTA}
                            icon={<Icon name={IconName.caloriesIcon} />}
                        />
                    </li>
                    <li className="flex-1">
                        <ActivityWidget
                            label="Distance"
                            value={`${statistics.distance} km`}
                            color={ActivityWidgetColor.PURPLE}
                            icon={<Icon name={IconName.stepsIcon} />}
                        />
                    </li>
                </ul>
                {!isSubscribed && (
                    <GoogleAds className="mb-6 hidden h-48 xl:flex" />
                )}
                <ChartGoalProgress workouts={workouts} />
                {incompletedGoals.length > 0 && (
                    <div className="mt-5 xl:pb-8">
                        <ul className="flex flex-col gap-4 md:flex-row">
                            {incompletedGoals.map((goal, index) => {
                                if (index > 1) {
                                    return;
                                }

                                return (
                                    <GoalCard
                                        key={goal.id}
                                        id={goal.id}
                                        activityType={goal.activityType}
                                        frequency={goal.frequency}
                                        frequencyType={goal.frequencyType}
                                        progress={goal.progress}
                                        distance={goal.distance}
                                        duration={goal.duration}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
            <div className="xl:basis-[32%]">
                <InfoSection
                    title="My Schedule"
                    viewAllLink={AppRoute.SCHEDULE}
                    className={isSubscribed ? 'mb-14' : 'mb-5'}
                    buttonTitle={
                        schedules.length > 0 ? 'View all' : 'Create schedule'
                    }
                >
                    {schedules.length > 0 ? (
                        <ul>
                            {sortSchedulesByDate(schedules).map(
                                (scheduleItem) => (
                                    <li className="mt-3" key={scheduleItem.id}>
                                        <Card
                                            title={formatScheduleDay(
                                                new Date(scheduleItem.startAt),
                                            )}
                                            data={formatScheduleTime(
                                                new Date(scheduleItem.startAt),
                                            )}
                                            name={capitalizeFirstLetter(
                                                scheduleItem.activityType,
                                            )}
                                        />
                                    </li>
                                ),
                            )}
                        </ul>
                    ) : (
                        <div className="border-lm-yellow-100 text-infoSection flex h-44 items-center justify-center rounded-md border-2">
                            Empty schedule
                        </div>
                    )}
                </InfoSection>
                {!isSubscribed && <GoogleAds className="mb-5 h-48" />}
                <InfoSection
                    title="Completed goals"
                    viewAllLink={completedGoalsLink}
                    className="mb-12 pb-8 xl:pb-0"
                    buttonTitle={completedGoalsStatus}
                >
                    {completedGoalsStatus ===
                        CompletedGoalsStatus.COMPLETED_GOALS && (
                        <ul>
                            {sortGoalsByDate(completedGoals).map(
                                ({ id, activityType, completedAt }, index) => {
                                    if (index > 4) {
                                        return;
                                    }

                                    return (
                                        <li key={id} className="mt-4">
                                            <Card
                                                name={capitalizeFirstLetter(
                                                    activityType,
                                                )}
                                                data={getCompletedDate(
                                                    completedAt,
                                                )}
                                            />
                                        </li>
                                    );
                                },
                            )}
                        </ul>
                    )}
                    {completedGoalsStatus ===
                        CompletedGoalsStatus.NO_COMPLETED_GOALS && (
                        <div className="border-lm-yellow-100 text-infoSection flex h-44 items-center justify-center rounded-md border-2">
                            You have not completed any goals yet
                        </div>
                    )}
                    {completedGoalsStatus === CompletedGoalsStatus.NO_GOALS && (
                        <div className="border-lm-yellow-100 text-infoSection flex h-44 items-center justify-center rounded-md border-2">
                            You have not created any goals yet
                        </div>
                    )}
                </InfoSection>
            </div>
        </div>
    );
};

export { Overview };
