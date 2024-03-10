import {
    Loader,
    SubNavigation,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    configureString,
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

const Workout: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const { dataStatus, workouts } = useAppSelector(({ workouts }) => ({
        dataStatus: workouts.dataStatus,
        workouts: workouts.workouts,
    }));

    useEffect(() => {
        void dispatch(actions.getWorkouts());
    }, [dispatch]);

    useEffect(() => {
        const firstWorkoutId = workouts[0]?.id;

        if (!id && firstWorkoutId) {
            const redirectPath = configureString(AppRoute.WORKOUT_$ID, {
                id: String(firstWorkoutId),
            });
            navigate(redirectPath);
        }
    }, [id, navigate, workouts]);

    const subNavigationTitle = 'Workout tracking';
    const subNavigationItems = workouts.map((workout) => {
        const { id, activityType } = workout;

        return {
            id: String(id),
            label: capitalizeFirstLetter(activityType),
            to: String(id),
        };
    });

    const isLoading = dataStatus === DataStatus.PENDING;

    return (
        <section className="relative flex h-full">
            {isLoading ? (
                <Loader isOverflow />
            ) : (
                <div className="flex w-full">
                    <SubNavigation
                        title={subNavigationTitle}
                        items={subNavigationItems}
                    />
                    <div className="border-lm-black-400 h-full border"></div>

                    <div className="flex w-full max-w-[50rem] flex-col px-[1.5rem]">
                        {workouts.length > 0 ? (
                            <WorkoutItem />
                        ) : (
                            <p className="text-md text-center text-white">
                                You don&#39;t have any workouts yet
                            </p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export { Workout };
