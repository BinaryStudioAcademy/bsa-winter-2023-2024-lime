import { PlusIcon } from '@heroicons/react/16/solid';

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
    GoalCard,
} from '~/bundles/goals/components/components.js';
import {
    type Activity,
    type FrequencyType,
} from '~/bundles/goals/enums/enums.js';
import { actions as goalsActions } from '~/bundles/goals/store/goals.js';

const achievements = [
    {
        id: 1,
        activity: 'walking',
        distance: 23,
        duration: 11,
        completedAt: 'Saturday, April 14 | 08:00 AM',
    },
    {
        id: 2,
        activity: 'running',
        distance: 23,
        duration: 11,
        completedAt: 'Saturday, April 15 | 08:00 AM',
    },
    {
        id: 3,
        activity: 'cycling',
        distance: 23,
        duration: 11,
        completedAt: 'Saturday, April 16 | 08:00 AM',
    },
    {
        id: 4,
        activity: 'running',
        distance: 23,
        duration: 11,
        completedAt: 'Saturday, April 17 | 08:00 AM',
    },
];

const Goals: React.FC = () => {
    const dispatch = useAppDispatch();

    const { dataStatus, goals } = useAppSelector(({ goals }) => ({
        dataStatus: goals.dataStatus,
        goals: goals.goals,
    }));

    const isLoading = dataStatus === DataStatus.PENDING;

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        void dispatch(goalsActions.getGoals());
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

    return (
        <main className="bg-lm-black-200 flex h-screen gap-10 px-8 pb-14 pt-10">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex flex-col gap-8">
                        <section className="pt-[3.125rem]">
                            {achievements?.length === 0 &&
                            goals?.length === 0 ? (
                                <div className="bg-lm-yellow-100 h-[160px] w-full rounded-xl">
                                    Unleash your fitness potential with new
                                    goals
                                </div>
                            ) : (
                                <div className="bg-lm-yellow-100 h-[160px] w-full rounded-xl"></div>
                            )}
                        </section>
                        <section className="overflow-y-auto overflow-x-hidden px-4">
                            <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                                Goals
                            </h2>
                            <div className="mb-4 flex w-[49rem] flex-wrap gap-4">
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
                            <div className="w-96">
                                <Button
                                    type="button"
                                    label="Set the new goal"
                                    variant={ButtonVariant.SECONDARY}
                                    size={ComponentSize.LARGE}
                                    leftIcon={<PlusIcon className="w-6" />}
                                    className="h-[7.5rem]"
                                    onClick={handleOpenModal}
                                />
                            </div>
                        </section>
                    </div>

                    <section className="overflow-y-auto overflow-x-hidden px-4">
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Achievements
                        </h2>

                        <div className="flex flex-col gap-4 overflow-y-auto">
                            {achievements?.length > 0 &&
                                achievements.map(
                                    ({
                                        id,
                                        activity,
                                        completedAt,
                                        distance,
                                    }) => (
                                        <AchievementCard
                                            key={id}
                                            activity={activity}
                                            date={completedAt}
                                            distance={distance}
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
