import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import {
    AchievementCard,
    ActivityWidget,
    ActivityWidgetColor,
    Icon,
    Loader,
} from '~/bundles/common/components/components.js';
import {
    IconColor,
    IconName,
} from '~/bundles/common/components/icon/enums/enums.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
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
import { actions as friendsActions } from '~/bundles/friends/store/friends.js';
import { actions as goalsActions } from '~/bundles/goals/store/goals.js';
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
    const [isFollowed, setIsFollowed] = useState(false);
    const NumericId = Number(id);

    useEffect(() => {
        void dispatch(userActions.getById(NumericId));
        void dispatch(achievementsActions.getAchievementsByUserId(NumericId));
        void dispatch(workoutsActions.getLastWorkoutsByUserId(NumericId));
        void dispatch(goalsActions.getGoalsByUserId(NumericId));
    }, [dispatch, NumericId]);

    const { dataStatus: dataStatusUser, user } = useAppSelector(
        ({ users }) => users,
    );
    const { dataStatus: dataStatusAchievements, achievements } = useAppSelector(
        ({ achievements }) => achievements,
    );
    const { dataStatus: dataStatusWorkouts, workouts } = useAppSelector(
        ({ workouts }) => workouts,
    );
    const { dataStatus: dataStatusGoals, goals } = useAppSelector(
        ({ goals }) => goals,
    );

    const isLoading = [
        dataStatusUser,
        dataStatusAchievements,
        dataStatusWorkouts,
        dataStatusGoals,
    ].includes(DataStatus.PENDING);

    const totalDuration = calculateTotal(workouts, 'duration');
    const totalDistance = calculateTotal(workouts, 'distance');
    const totalCalories = calculateTotal(workouts, 'kilocalories');
    const [hours, minutes, seconds] = convertSecondsToHMS(totalDuration);

    const handleToggleFollow = useCallback(
        (id: number) => {
            if (isFollowed) {
                void dispatch(
                    friendsActions.removeFollowing({
                        followingId: id,
                    }),
                );
            } else {
                void dispatch(
                    friendsActions.addFollowing({
                        followingId: id,
                    }),
                );
            }
            setIsFollowed((previousIsFollowed) => !previousIsFollowed);
        },
        [dispatch, isFollowed],
    );

    const handleMessageFriend = useCallback(() => {
        //navigate to chat page with specific user
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (user) {
        return (
            <main className="flex h-full w-full max-w-[1136px] sm:w-full sm:flex-col md:flex-row-reverse xl:flex xl:gap-8 2xl:basis-[1136px]">
                <div className="sm:mb-8">
                    <PersonalDetails
                        id={NumericId}
                        user={user}
                        goals={goals}
                        isFollowed={isFollowed}
                        onFollowToggle={handleToggleFollow}
                        message={handleMessageFriend}
                    />
                </div>
                <div className="w-full">
                    <section className="text-primary w-full px-[1.5rem] pb-8">
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Last Workout data
                        </h2>
                        <div className="flex w-full flex-wrap gap-8">
                            {workouts.length > ZERO_VALUE ? (
                                <ProfileWorkoutItem
                                    workout={getLastWorkout(workouts)}
                                />
                            ) : (
                                <p className="text-md text-primary">
                                    User doesn&#39;t have workouts yet
                                </p>
                            )}
                        </div>
                    </section>
                    <section className="text-primary px-[1.5rem]">
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Statistics of current month
                        </h2>
                        <ul className="mb-6 flex flex-col gap-4 md:flex-col xl:flex-row">
                            <li className="flex-1">
                                <ActivityWidget
                                    label="Total workouts"
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
                                    label="Total duration"
                                    value={`${hours} hrs ${minutes} min ${seconds}`}
                                    color={ActivityWidgetColor.GREEN}
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
                        <div className="flex w-full flex-wrap gap-4 sm:flex-col lg:flex-row">
                            {achievements &&
                            achievements.length > ZERO_VALUE ? (
                                achievements.map((achievement) => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                    />
                                ))
                            ) : (
                                <p className="text-md text-primary">
                                    User doesn&#39;t have achievements yet
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        );
    }
};

export { PublicProfile };
