import { Icon, Loader } from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/components/icon/enums/icon-name.enum.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getLastWorkout,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useNavigate,
    useParams,
} from '~/bundles/common/hooks/hooks.js';
import { WorkoutItem } from '~/bundles/workouts/components/components.js';
import { actions } from '~/bundles/workouts/store/workouts.js';

import { SubNavigationWorkout } from '../../components/sub-navigation/sub-navigation-workout.js';

const Workout: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const { dataStatus, workouts } = useAppSelector(({ workouts }) => workouts);

    useEffect(() => {
        void dispatch(actions.getWorkouts());
    }, [dispatch]);

    useEffect(() => {
        const firstWorkoutId = getLastWorkout(workouts)?.id;

        if (!id && firstWorkoutId) {
            const redirectPath = configureString(AppRoute.WORKOUT_$ID, {
                id: String(firstWorkoutId),
            });
            navigate(redirectPath);
        }
    }, [id, navigate, workouts]);

    const subNavigationTitle = 'Workout tracking';

    const isLoading = dataStatus === DataStatus.PENDING;

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
                                />
                            </div>

                            <div className="border-lm-black-400 border sm:my-[1rem] sm:h-0 md:my-[-2rem] md:h-[calc(100%+4rem)]"></div>

                            <div className="w-full px-[1.5rem]">
                                <WorkoutItem />
                            </div>
                        </>
                    ) : (
                        <div className="font-base text-primary flex w-full flex-col items-center justify-center gap-2 px-[2rem] text-center text-xl md:px-0">
                            <p>You don&#39;t have any workouts yet</p>
                            <Icon name={IconName.workoutIcon} />
                            <p>When you add some they will appear here</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export { Workout };
