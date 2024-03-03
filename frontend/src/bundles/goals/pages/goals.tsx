import { PlusIcon } from '@heroicons/react/16/solid';

import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import { type AchievementResponseDto } from '~/bundles/achievements/types/types.js';
import {
    AchievementCard,
    Button,
    ButtonVariant,
    Loader,
    ThemeSwitcher,
} from '~/bundles/common/components/components.js';
import { CreateGoalForm } from '~/bundles/common/components/create-goal-form/create-goal-form.js';
import { type CreateGoalRequest } from '~/bundles/common/components/create-goal-form/types/types.js';
import { Modal } from '~/bundles/common/components/modal/modal.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
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

const Goals: React.FC = () => {
    const dispatch = useAppDispatch();

    const { dataStatus: dataStatusGoals, goals } = useAppSelector(
        ({ goals }) => ({
            dataStatus: goals.dataStatus,
            goals: goals.goals,
        }),
    );

    const { dataStatus: dataStatusAchievements, achievements } = useAppSelector(
        ({ achievements }) => ({
            dataStatus: achievements.dataStatus,
            achievements: achievements.achievements,
        }),
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
                distance: Number(payload.distance) ?? null,
                duration: Number(payload.duration) ?? null,
            };
            void dispatch(goalsActions.createGoal(createGoalPayload));
            void setIsModalOpen(false);
        },
        [dispatch],
    );

    const achievement = achievements.at(-1) as AchievementResponseDto;

    return (
        <main className="bg-primary flex w-full flex-col gap-8 md:h-screen md:justify-between lg:flex-row lg:justify-normal">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex flex-col gap-8 ">
                        <section className="pt-[3.125rem] md:w-full lg:w-[37rem] xl:w-[49rem]">
                            <GoalWidget
                                value={achievement?.requirement}
                                target={achievement?.requirement}
                                title={
                                    achievement?.name
                                        ? GOALS_MESSAGES.GOAL_COMPLETED
                                        : GOALS_MESSAGES.NO_GOALS
                                }
                                subTitle={
                                    achievement?.name
                                        ? GOALS_MESSAGES.GOAL_ENCOURAGE
                                        : ''
                                }
                                goalType={
                                    activityToGoal[achievement.activityType]
                                }
                                hasAchievement={achievement ? true : false}
                            />
                        </section>
                        <section className="overflow-y-auto overflow-x-hidden">
                            <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                                Goals
                            </h2>
                            <div className="mb-4 flex flex-col gap-4 md:w-full lg:w-[37rem] lg:flex-row lg:flex-wrap xl:w-[49rem]">
                                {goals.length === 0 && (
                                    <p className="mb-5 w-full text-xl font-extrabold text-white">
                                        No goals yet
                                    </p>
                                )}

                                {goals?.length > 0 &&
                                    goals.map(
                                        ({
                                            id,
                                            activityType,
                                            frequency,
                                            frequencyType,
                                            progress,
                                        }) => (
                                            <GoalCard
                                                key={id}
                                                activity={activityType}
                                                frequency={frequency}
                                                frequencyType={frequencyType}
                                                progress={progress}
                                            />
                                        ),
                                    )}
                            </div>
                            <div className="md:w-full xl:w-96">
                                <Button
                                    type="button"
                                    label="Set the new goal"
                                    variant={ButtonVariant.SECONDARY}
                                    size={ComponentSize.LARGE}
                                    leftIcon={<PlusIcon className="w-6" />}
                                    className="h-[5rem] sm:text-sm md:h-[7.5rem] md:text-xl"
                                    onClick={handleOpenModal}
                                />
                            </div>
                        </section>
                    </div>

                    <section className="overflow-y-auto overflow-x-hidden">
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Achievements
                        </h2>

                        <div className="flex w-full flex-col gap-4 overflow-y-auto">
                            {achievements?.length > 0 &&
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
                    <ThemeSwitcher className="absolute bottom-4 right-4" />
                </>
            )}
        </main>
    );
};

export { Goals };
