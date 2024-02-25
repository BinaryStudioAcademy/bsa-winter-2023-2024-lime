import { PlusIcon } from '@heroicons/react/16/solid';

import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import {
    Button,
    ButtonVariant,
    Loader,
} from '~/bundles/common/components/components.js';
import { CreateGoalForm } from '~/bundles/common/components/create-goal-form/create-goal-form.js';
import { type GoalRequest } from '~/bundles/common/components/create-goal-form/types/types.js';
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
import {
    AchievementCard,
    FinishedGoalCard,
    GoalCard,
} from '~/bundles/goals/components/components.js';
import {
    type Activity,
    type FrequencyType,
} from '~/bundles/goals/enums/enums.js';
import { actions as goalsActions } from '~/bundles/goals/store/goals.js';

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
        (payload: GoalRequest): void => {
            const [frequency, frequencyType] = payload.frequency.split(' ');

            const createGoalPayload = {
                activity: payload.activity as ValueOf<typeof Activity>,
                frequency: Number(frequency),
                frequencyType: frequencyType as ValueOf<typeof FrequencyType>,
                distance: Number(payload.distance) || null,
                duration: Number(payload.duration) || null,
            };
            void dispatch(goalsActions.createGoal(createGoalPayload));
        },
        [dispatch],
    );

    const lastAchievement = achievements.at(-1);

    return (
        <main className="bg-lm-black-200 flex w-screen flex-col gap-8 px-16 pb-14 pt-10 md:h-screen md:flex-row md:justify-between lg:justify-normal">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex flex-col gap-8 ">
                        <section className="pt-[3.125rem]">
                            <FinishedGoalCard
                                achievement={lastAchievement?.name}
                                activity={lastAchievement?.activity}
                            />
                        </section>
                        <section className="overflow-y-auto overflow-x-hidden">
                            <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                                Goals
                            </h2>
                            <div className="mb-4 flex flex-col gap-4 lg:w-[37rem] lg:flex-row lg:flex-wrap xl:w-[49rem]">
                                {goals.length === 0 && (
                                    <p className="mb-5 w-full text-xl font-extrabold text-white">
                                        No goals yet
                                    </p>
                                )}

                                {goals?.length > 0 &&
                                    goals.map(
                                        ({
                                            id,
                                            activity,
                                            frequency,
                                            frequencyType,
                                            progress,
                                        }) => (
                                            <GoalCard
                                                key={id}
                                                activity={activity}
                                                frequency={frequency}
                                                frequencyType={frequencyType}
                                                progress={progress}
                                            />
                                        ),
                                    )}
                            </div>
                            <div className="md:w-72 xl:w-96">
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

                        <div className="flex flex-col gap-4 overflow-y-auto">
                            {achievements?.length > 0 &&
                                achievements.map(
                                    ({ id, activity, createdAt, name }) => (
                                        <AchievementCard
                                            key={id}
                                            activity={activity}
                                            date={createdAt}
                                            achievement={name}
                                        />
                                    ),
                                )}
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
