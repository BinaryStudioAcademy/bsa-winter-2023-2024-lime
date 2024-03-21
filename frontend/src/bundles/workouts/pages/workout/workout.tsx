import {
    Icon,
    Loader,
    SubNavigation,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/components/icon/enums/icon-name.enum.js';
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

    const { dataStatus, workouts } = useAppSelector(({ workouts }) => workouts);

    useEffect(() => {
        void dispatch(actions.getWorkouts());
    }, [dispatch]);

    useEffect(() => {
        const firstWorkoutId = workouts[0]?.id;

        if (!id && firstWorkoutId) {
            const redirectPath = configureString(AppRoute.WORKOUT_$ID, {
                id: String(firstWorkoutId),
            });
            navigate(redirectPath, { replace: true });
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
        <section className="relative flex h-full w-full max-w-[1136px]">
            {isLoading ? (
                <Loader isOverflow />
            ) : (
                <>
                    <div className="flex w-full">
                        {workouts.length > 0 ? (
                            <>
                                <div className="my-[-2rem] ml-[-2rem]">
                                    <SubNavigation
                                        title={subNavigationTitle}
                                        items={subNavigationItems}
                                    />
                                </div>

                                <div className="border-lm-black-400 my-[-2rem] h-[calc(100%+4rem)] border"></div>

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
                </>
            )}
        </section>
    );
};

export { Workout };
