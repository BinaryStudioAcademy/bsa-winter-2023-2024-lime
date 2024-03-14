import { PlusIcon } from '@heroicons/react/16/solid';

import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import {
    AchievementCard,
    Button,
    ButtonVariant,
    Loader,
} from '~/bundles/common/components/components.js';
import { CreateGoalForm } from '~/bundles/common/components/create-goal-form/create-goal-form.js';
import { Modal } from '~/bundles/common/components/modal/modal.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { convertToMeters } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    type CreateGoalRequest,
    type ValueOf,
} from '~/bundles/common/types/types.js';
import { GoalCard } from '~/bundles/goals/components/components.js';
import { GOALS_MESSAGES } from '~/bundles/goals/constants/goals-messages.js';
import {
    type FrequencyType,
    ActivityType,
} from '~/bundles/goals/enums/enums.js';
import { actions as goalsActions } from '~/bundles/goals/store/goals.js';
import { GoalWidget } from '~/bundles/overview/components/components.js';
import { GoalTypes } from '~/bundles/overview/components/goal-widget/enums/goal-types.enums.js';

const activityToGoal: Record<
    ValueOf<typeof ActivityType>,
    ValueOf<typeof GoalTypes>
> = {
    [ActivityType.RUNNING]: GoalTypes.RUNNING,
    [ActivityType.CYCLING]: GoalTypes.CYCLING,
    [ActivityType.WALKING]: GoalTypes.WALKING,
};

const ZERO_VALUE = 0;

const Goals: React.FC = () => {
    const dispatch = useAppDispatch();

    const { dataStatus: dataStatusGoals, goals } = useAppSelector(
        ({ goals }) => goals,
    );

    const { dataStatus: dataStatusAchievements, achievements } = useAppSelector(
        ({ achievements }) => achievements,
    );

    const isLoading =
        dataStatusGoals === DataStatus.PENDING ||
        dataStatusAchievements === DataStatus.PENDING;

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        void dispatch(goalsActions.getGoals());
    }, [dispatch]);

    useEffect(() => {
        void dispatch(achievementsActions.getAchievements());
    }, [dispatch]);

    const handleOpenModal = useCallback((): void => {
        void setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback((): void => {
        void setIsModalOpen(false);
    }, []);

    const handleAddGoal = useCallback(
        (payload: CreateGoalRequest): void => {
            const [frequency, frequencyType] = payload.frequency.split(' ');

            const createGoalPayload = {
                activityType: payload.activity as ValueOf<typeof ActivityType>,
                frequency: Number(frequency),
                frequencyType: frequencyType as ValueOf<typeof FrequencyType>,
                distance: payload.distance
                    ? convertToMeters(Number(payload.distance))
                    : null,
                duration: payload.duration ? Number(payload.duration) : null,
            };
            void dispatch(goalsActions.createGoal(createGoalPayload));
            void setIsModalOpen(false);
        },
        [dispatch],
    );

    const unfulfilledGoals = goals.filter((goal) => !goal.completedAt);
    const lastGoal = goals.filter((goal) => goal.completedAt !== null).at(-1);

    return (
        <main className="bg-secondary ml-auto mr-auto flex w-full max-w-[71rem] flex-col gap-8 xl:flex-row xl:justify-normal">
            {isLoading ? (
                <Loader isOverflow />
            ) : (
                <>
                    <div className="flex w-full flex-col gap-8 xl:w-[70%]">
                        <section>
                            <GoalWidget
                                value={
                                    (lastGoal?.distance as number) ||
                                    (lastGoal?.duration as number)
                                }
                                target={
                                    (lastGoal?.distance as number) ||
                                    (lastGoal?.duration as number)
                                }
                                title={
                                    lastGoal
                                        ? GOALS_MESSAGES.GOAL_COMPLETED
                                        : GOALS_MESSAGES.NO_GOALS
                                }
                                subTitle={
                                    lastGoal
                                        ? GOALS_MESSAGES.GOAL_ENCOURAGE
                                        : ''
                                }
                                goalType={
                                    lastGoal
                                        ? activityToGoal[lastGoal.activityType]
                                        : GoalTypes.STANDART
                                }
                                hasAchievement={Boolean(lastGoal)}
                                hasDistance={Boolean(lastGoal?.distance)}
                            />
                        </section>
                        <section>
                            <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                                Goals
                            </h2>
                            <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:flex-wrap">
                                {goals.length === ZERO_VALUE && (
                                    <p className="text-primary mb-5 w-full text-xl font-extrabold">
                                        No goals yet
                                    </p>
                                )}

                                {unfulfilledGoals?.length > ZERO_VALUE &&
                                    unfulfilledGoals.map(
                                        ({
                                            id,
                                            activityType,
                                            frequency,
                                            frequencyType,
                                            progress,
                                            distance,
                                            duration,
                                        }) => (
                                            <GoalCard
                                                key={id}
                                                activityType={activityType}
                                                frequency={frequency}
                                                frequencyType={frequencyType}
                                                progress={progress}
                                                distance={distance}
                                                duration={duration}
                                            />
                                        ),
                                    )}
                            </div>
                            <div className="md:w-full lg:w-[48.8%]">
                                <Button
                                    type="button"
                                    label="Set the new goal"
                                    variant={ButtonVariant.SECONDARY}
                                    size={ComponentSize.LARGE}
                                    leftIcon={<PlusIcon className="w-6" />}
                                    className="h-[7.5rem] sm:text-sm md:text-xl"
                                    onClick={handleOpenModal}
                                />
                            </div>
                        </section>
                    </div>

                    <section>
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Achievements
                        </h2>

                        <div className="flex w-full flex-col gap-4 lg:flex-row lg:flex-wrap xl:flex-col">
                            {achievements?.length > ZERO_VALUE &&
                                achievements.map((achievement) => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                    />
                                ))}
                        </div>
                    </section>

                    <Modal
                        isOpen={isModalOpen}
                        title="Set the new goal"
                        onClose={handleCloseModal}
                    >
                        <CreateGoalForm
                            isLoading={false}
                            onSubmit={handleAddGoal}
                        />
                    </Modal>
                </>
            )}
        </main>
    );
};

export { Goals };
