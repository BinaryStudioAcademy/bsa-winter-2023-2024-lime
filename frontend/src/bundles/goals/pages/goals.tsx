import { PlusIcon } from '@heroicons/react/16/solid';

import {
    Button,
    ButtonVariant,
    Loader,
} from '~/bundles/common/components/components.js';
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
import {
    // AchievementCard,
    GoalCard,
} from '~/bundles/goals/components/components.js';
import { actions as goalsActions } from '~/bundles/goals/store/goals.js';
// import { type GoalRequestDto } from '~/bundles/goals/types/types.js';

const Goals: React.FC = () => {
    const dispatch = useAppDispatch();

    const { dataStatus, goals } = useAppSelector(({ goals }) => ({
        dataStatus: goals.dataStatus,
        goals: goals.goals,
    }));

    const isLoading = dataStatus === DataStatus.PENDING;

    const [isModalOpen, setIsModalOpen] = useState(false);

    // const achievements = [];

    useEffect(() => {
        void dispatch(goalsActions.getGoals());
    }, [dispatch]);

    const handleOpenModal = useCallback((): void => {
        void setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback((): void => {
        void setIsModalOpen(false);
    }, []);

    // const handleAddGoal = useCallback(
    //     (payload: GoalRequestDto): void => {
    //         void dispatch(goalsActions.createGoal(payload));
    //     },
    //     [dispatch],
    // );

    return (
        <main className="bg-lm-black-200 flex h-screen gap-10 px-8 pb-14 pt-10">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex flex-col gap-8">
                        <section className="pt-[3.125rem]">
                            {/* {achievements?.length === 0 &&
                            goals?.length === 0 ? (
                                <div className="bg-lm-yellow-100 h-[160px] w-full rounded-xl">
                                    Unleash your fitness potential with new
                                    goals
                                </div>
                            ) : (
                                <div className="bg-lm-yellow-100 h-[160px] w-full rounded-xl"></div>
                            )} */}
                        </section>
                        <section className="overflow-y-auto overflow-x-hidden px-4">
                            <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                                Goals
                            </h2>
                            <div className="mb-4 flex w-[49rem] flex-wrap gap-4">
                                {goals?.length > 0 ? (
                                    goals.map(
                                        ({
                                            id,
                                            activity,
                                            frequency,
                                            progress,
                                        }) => (
                                            <GoalCard
                                                key={id}
                                                activity={activity}
                                                frequency={frequency}
                                                progress={progress}
                                            />
                                        ),
                                    )
                                ) : (
                                    <p className="mb-5 w-full text-xl font-extrabold text-white">
                                        No goals yet
                                    </p>
                                )}
                            </div>
                            <Button
                                type="button"
                                label="Set the new goal"
                                variant={ButtonVariant.SECONDARY}
                                size={ComponentSize.LARGE}
                                leftIcon={<PlusIcon className="w-6" />}
                                className="h-[7.5rem] w-96"
                                onClick={handleOpenModal}
                            />
                        </section>
                    </div>

                    <section className="overflow-y-auto overflow-x-hidden px-4">
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Achievements
                        </h2>

                        <div className="flex flex-col gap-4 overflow-y-auto">
                            {/* {achievements?.length > 0 &&
                                achievements.map(
                                    ({ id, name, date, quantity }) => (
                                        <AchievementCard
                                            key={id}
                                            title={name}
                                            date={date}
                                            quantity={quantity}
                                        />
                                    ),
                                )} */}
                        </div>
                    </section>

                    <Modal
                        isOpen={isModalOpen}
                        title="Set the new goal"
                        onClose={handleCloseModal}
                    />
                </>
            )}
        </main>
    );
};

export { Goals };
