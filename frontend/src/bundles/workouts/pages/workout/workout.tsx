import { PlusIcon } from '@heroicons/react/16/solid';

import {
    Button,
    ButtonVariant,
    Icon,
    Loader,
    Modal,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/components/icon/enums/icon-name.enum.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getLastWorkout,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    CreateWorkoutForm,
    WorkoutItem,
} from '~/bundles/workouts/components/components.js';
import { actions } from '~/bundles/workouts/store/workouts.js';
import { type WorkoutRequestDto } from '~/bundles/workouts/types/types.js';

import { SubNavigationWorkout } from '../../components/sub-navigation/sub-navigation-workout.js';

const Workout: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const { dataStatus, workouts } = useAppSelector(({ workouts }) => workouts);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        void dispatch(actions.getWorkouts());
    }, [dispatch]);

    useEffect(() => {
        const firstWorkoutId = getLastWorkout(workouts)?.id;

        if (!id && firstWorkoutId) {
            const redirectPath = configureString(AppRoute.WORKOUT_$ID, {
                id: String(firstWorkoutId),
            });
            navigate(redirectPath, { replace: true });
        }
    }, [id, navigate, workouts]);

    const subNavigationTitle = 'Workout tracking';

    const isLoading = dataStatus === DataStatus.PENDING;

    const handleOpenModal = useCallback((): void => {
        void setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback((): void => {
        void setIsModalOpen(false);
    }, []);

    const handleCreateWorkout = useCallback(
        (payload: WorkoutRequestDto): void => {
            dispatch(actions.createWorkout(payload))
                .unwrap()
                .then((result) => {
                    setIsModalOpen(false);
                    navigate(
                        configureString(AppRoute.WORKOUT_$ID, {
                            id: String(result.id),
                        }),
                    );
                })
                .catch(() => {
                    void setIsModalOpen(false);
                });
        },
        [dispatch, navigate],
    );

    return (
        <section className="relative flex h-full w-full max-w-[1136px]">
            {isLoading ? (
                <Loader isOverflow />
            ) : (
                <div className="flex w-full flex-col md:flex-row">
                    {workouts.length > 0 ? (
                        <>
                            <div className="my-[-2rem] ml-[-1rem]">
                                <SubNavigationWorkout
                                    title={subNavigationTitle}
                                    button={
                                        <Button
                                            label="Add workout"
                                            onClick={handleOpenModal}
                                            size={ComponentSize.SMALL}
                                            leftIcon={
                                                <PlusIcon className="h-5 w-5" />
                                            }
                                            variant={ButtonVariant.SECONDARY}
                                            className="max-w-56"
                                        />
                                    }
                                />
                            </div>

                            <div className="border-buttonTertiary border sm:my-[1rem] sm:h-0 md:mx-2 md:my-[-2rem] md:h-[calc(100%+4rem)] md:opacity-0"></div>

                            <div className="w-full px-[1.5rem]">
                                <WorkoutItem />
                            </div>
                        </>
                    ) : (
                        <div className="font-base text-primary flex w-full flex-col items-center justify-center gap-2 px-[2rem] text-center text-xl md:px-0">
                            <p>You don&#39;t have any workouts yet</p>
                            <Icon name={IconName.workoutIcon} />
                            <p>When you add some they will appear here</p>
                            <div>
                                <Button
                                    label="Add manually"
                                    size={ComponentSize.MEDIUM}
                                    variant={ButtonVariant.PRIMARY}
                                    leftIcon={<PlusIcon className="w-6" />}
                                    onClick={handleOpenModal}
                                />
                            </div>
                        </div>
                    )}
                    <Modal
                        isOpen={isModalOpen}
                        title="Add new workout"
                        onClose={handleCloseModal}
                        size={ComponentSize.LARGE}
                    >
                        <CreateWorkoutForm
                            onSubmit={handleCreateWorkout}
                            isLoading={isLoading}
                        />
                    </Modal>
                </div>
            )}
        </section>
    );
};

export { Workout };
