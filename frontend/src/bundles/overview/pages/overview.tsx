/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type GoalResponseDto, type WorkoutResponseDto } from 'shared';

import {
    ActivityWidget,
    ActivityWidgetColor,
    Card,
    Icon,
    InfoSection,
    Loader,
} from '~/bundles/common/components/components.js';
import {
    IconColor,
    IconName,
} from '~/bundles/common/components/icon/enums/enums.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    formatDateString,
} from '~/bundles/common/helpers/helpers.js';
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

import { type ValueOf, CompletedGoalsStatus } from '../overview.js';
import styles from './styles.module.css';

const scheduleData = [
    {
        id: 1,
        title: 'Monday',
        name: 'Stretch',
        data: 'At 08:00',
        chip: '20 Pieces',
    },
    {
        id: 2,
        title: 'Wednesday',
        name: 'Yoga',
        data: 'At 08:00',
        chip: '10 min',
    },
    {
        id: 3,
        title: 'Tuesday',
        name: 'Back Stretch',
        data: 'At 08:00',
        chip: '10 Round',
    },
];

const classifyGoalsByCompletion = (goals: GoalResponseDto[]) => {
    const completedGoals = [];
    const incompletedGoals = [];

    for (const goal of goals) {
        goal.completedAt === null
            ? incompletedGoals.push(goal)
            : completedGoals.push(goal);
    }

    return { completedGoals, incompletedGoals };
};

const defineGoalDate = (date: string | null): string => {
    return date ? 'Completed at: ' + formatDateString(new Date(date)) : '';
};

const defineCompletedGoalsStatus = (
    goals: GoalResponseDto[],
    completedGoals: GoalResponseDto[],
): string => {
    let status: ValueOf<typeof CompletedGoalsStatus> =
        CompletedGoalsStatus.NO_GOALS;

    if (goals.length > 0 && completedGoals.length > 0) {
        status = CompletedGoalsStatus.COMPLETED_GOALS;
    } else if (goals.length > 0 && completedGoals.length === 0) {
        status = CompletedGoalsStatus.NO_COMPLETED_GOALS;
    }

    return status;
};

const calculateStatistics = (workouts: WorkoutResponseDto[]) => {
    const seccondsInHour = 3600;
    const result = {
        workouts: 0,
        steps: 0,
        kilocalories: 0,
    };

    for (const workout of workouts) {
        result.workouts += Math.floor(workout.duration / seccondsInHour);
        result.steps += workout.steps ?? 0;
        result.kilocalories += workout.kilocalories;
    }

    return result;
};

const Overview: React.FC = () => {
    const dispatch = useAppDispatch();

    const { goals, dataStatus: goalsDataStatus } = useAppSelector(
        ({ goals }) => goals,
    );

    const { workouts } = useAppSelector(({ workouts }) => workouts);

    const isLoading = goalsDataStatus === DataStatus.PENDING;
    useEffect(() => {
        void dispatch(goalsActions.getGoals());
    }, [dispatch]);

    const { completedGoals, incompletedGoals } = useMemo(
        () => classifyGoalsByCompletion(goals),
        [goals],
    );

    const completedGoalsStatus = defineCompletedGoalsStatus(
        goals,
        completedGoals,
    );

    const completedGoalsLink =
        completedGoalsStatus === CompletedGoalsStatus.NO_COMPLETED_GOALS
            ? AppRoute.WORKOUT
            : AppRoute.GOALS;

    const statistics = useMemo(() => calculateStatistics(workouts), [workouts]);

    if (isLoading) {
        return <Loader isOverflow />;
    }

    return (
        <div className="ml-auto mr-auto max-w-[1136px] xl:flex xl:gap-8">
            <div className="xl:basis-[68%]">
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
                            label="Steps"
                            value={`${statistics.steps} steps`}
                            color={ActivityWidgetColor.PURPLE}
                            icon={<Icon name={IconName.stepsIcon} />}
                        />
                    </li>
                </ul>
                <ChartGoalProgress />
                {incompletedGoals.length > 0 && (
                    <div className="mt-5">
                        <ul className="flex gap-4">
                            {incompletedGoals.map((goal, index) => {
                                if (index > 1) {
                                    return;
                                }

                                return (
                                    <li key={goal.id} className="flex-1">
                                        <GoalCard
                                            className="bg-primary xl:w-auto"
                                            activityType={goal.activityType}
                                            frequency={goal.frequency}
                                            frequencyType={goal.frequencyType}
                                            progress={goal.progress}
                                        />
                                    </li>
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
                    className="mb-14"
                >
                    {scheduleData.length > 0 ? (
                        <ul>
                            {scheduleData.map((scheduleItem) => (
                                <li
                                    className={styles['schedule__item']}
                                    key={scheduleItem.id}
                                >
                                    <Card {...scheduleItem} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Empty schedule</p>
                    )}
                </InfoSection>
                <InfoSection
                    title="Completed goals"
                    viewAllLink={completedGoalsLink}
                    className="mb-12"
                    buttonTitle={completedGoalsStatus}
                >
                    {completedGoalsStatus ===
                        CompletedGoalsStatus.COMPLETED_GOALS && (
                        <ul>
                            {completedGoals.map(
                                ({ id, activityType, completedAt }, index) => {
                                    if (index > 4) {
                                        return;
                                    }

                                    return (
                                        <li
                                            key={id}
                                            className={styles['goal__item']}
                                        >
                                            <Card
                                                name={capitalizeFirstLetter(
                                                    activityType,
                                                )}
                                                data={defineGoalDate(
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
