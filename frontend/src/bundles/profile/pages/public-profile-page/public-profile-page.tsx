import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import {
    AchievementCard,
    ActivityWidget,
    ActivityWidgetColor,
    Icon,
    Loader,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { IconName } from '~/bundles/common/components/icon/enums/icon-name.enum.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import {
    calculateTotal,
    convertSecondsToHMS,
    getLastWorkout,
    metersToKilometers,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    PersonalDetails,
    ProfileWorkoutItem,
} from '~/bundles/profile/components/components.js';
import { actions as userActions } from '~/bundles/users/store/users.js';
import { actions as workoutsActions } from '~/bundles/workouts/store/workouts.js';

const ZERO_VALUE = 0;
const PublicProfile: React.FC = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const [isFriend, setIsFriend] = useState(false);
    const NumericId = Number(id);

    useEffect(() => {
        void dispatch(userActions.getById(NumericId));
    }, [dispatch, NumericId]);

    useEffect(() => {
        void dispatch(achievementsActions.getAchievementsByUserId(NumericId));
    }, [dispatch, NumericId]);

    useEffect(() => {
        void dispatch(workoutsActions.getLastWorkoutsByUserId(NumericId));
    }, [dispatch, NumericId]);

    const { dataStatus: dataStatusUser, user } = useAppSelector(
        ({ users }) => ({
            dataStatus: users.dataStatus,
            user: users.user,
        }),
    );

    const { dataStatus: dataStatusAchievements, achievements } = useAppSelector(
        ({ achievements }) => ({
            dataStatus: achievements.dataStatus,
            achievements: achievements.achievements,
        }),
    );

    const { dataStatus: dataStatusWorkouts, workouts } = useAppSelector(
        ({ workouts }) => ({
            dataStatus: workouts.dataStatus,
            workouts: workouts.workouts,
        }),
    );

    const isLoading =
        dataStatusUser === DataStatus.PENDING ||
        dataStatusAchievements === DataStatus.PENDING ||
        dataStatusWorkouts === DataStatus.PENDING;

    const totalDuration = calculateTotal(workouts, 'duration');
    const totalDistance = calculateTotal(workouts, 'distance');
    const totalCalories = calculateTotal(workouts, 'kilocalories');
    const [hours, minutes, seconds] = convertSecondsToHMS(totalDuration);

    const handleToggleFriend = useCallback(() => {
        setIsFriend((previousIsFriend) => !previousIsFriend);
    }, []);

    const handleMessageFriend = useCallback(() => {
        //navigate to chat page with specific user
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (user) {
        return (
            <div className="flex h-full w-full sm:w-full sm:flex-col md:flex-row-reverse">
                <div className="sm:mb-8">
                    <PersonalDetails
                        id={NumericId}
                        user={user}
                        isFriend={isFriend}
                        toggleFriend={handleToggleFriend}
                        messageFriend={handleMessageFriend}
                    />
                </div>
                <div className="w-full">
                    <section className="text-primary w-full px-[1.5rem]">
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Last Workout data
                        </h2>
                        <div className="flex w-full flex-wrap gap-8">
                            {workouts?.length > ZERO_VALUE && (
                                <ProfileWorkoutItem
                                    workout={getLastWorkout(workouts)}
                                />
                            )}
                        </div>
                    </section>
                    <section className="text-primary px-[1.5rem]">
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Statistics Section for current month
                        </h2>
                        <ul className="mb-6 flex flex-col gap-4 md:flex-col xl:flex-row">
                            <li className="flex-1">
                                <ActivityWidget
                                    label="Total number of workouts"
                                    value={`${workouts.length} workouts`}
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
                                    label="Total distance"
                                    value={`${metersToKilometers(totalDistance)} km`}
                                    color={ActivityWidgetColor.MAGENTA}
                                    icon={<Icon name={IconName.stepsIcon} />}
                                />
                            </li>
                            <li className="flex-1">
                                <ActivityWidget
                                    label="Total duration of workouts"
                                    value={`${hours} hrs ${minutes} min ${seconds}`}
                                    color={ActivityWidgetColor.YELLOW}
                                    icon={<Icon name={IconName.durationIcon} />}
                                />
                            </li>
                            <li className="flex-1">
                                <ActivityWidget
                                    label="Total calories"
                                    value={`${totalCalories} kcl`}
                                    color={ActivityWidgetColor.PURPLE}
                                    icon={<Icon name={IconName.caloriesIcon} />}
                                />
                            </li>
                        </ul>
                    </section>
                    <section className="px-[1.5rem] pb-8">
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Achievements
                        </h2>
                        <div className="flex w-full flex-wrap gap-4">
                            {achievements &&
                            achievements.length > ZERO_VALUE ? (
                                achievements.map((achievement) => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                    />
                                ))
                            ) : (
                                <p className="text-md text-center text-white">
                                    User don&#39;t have achievements yet
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
};

export { PublicProfile };
