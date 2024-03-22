import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import { actions as chatActionCreator } from '~/bundles/chats/store/chats.js';
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
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    calculateTotal,
    configureString,
    convertSecondsToHMS,
    getLastWorkout,
    metersToKilometers,
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
import { actions as friendsActions } from '~/bundles/friends/store/friends.js';
import { type UserAuthResponseDto } from '~/bundles/friends/types/types.js';
import { actions as goalsActions } from '~/bundles/goals/store/goals.js';
import {
    PersonalDetails,
    ProfileWorkoutItem,
} from '~/bundles/profile/components/components.js';
import { actions as userActions } from '~/bundles/users/store/users.js';
import { actions as workoutsActions } from '~/bundles/workouts/store/workouts.js';

const ZERO_VALUE = 0;
const PublicProfile: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const NumericId = Number(id);
    const { users: friends, dataStatus: dataStatusFriends } = useAppSelector(
        ({ friends }) => friends,
    );

    const { user: authorizedUser } = useAppSelector(({ auth }) => auth) as {
        user: UserAuthResponseDto;
    };
    const { chats } = useAppSelector(({ chats }) => chats);
    const [isFollowed, setIsFollowed] = useState(
        friends.some((friends) => friends.userId === NumericId),
    );

    useEffect(() => {
        void dispatch(userActions.getById(NumericId));
        void dispatch(achievementsActions.getAchievementsByUserId(NumericId));
        void dispatch(workoutsActions.getLastWorkoutsByUserId(NumericId));
        void dispatch(goalsActions.getGoalsByUserId(NumericId));
    }, [dispatch, NumericId]);

    useEffect(() => {
        void dispatch(friendsActions.getFollowings({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(friendsActions.getFollowings({}))
            .unwrap()
            .then((friends) => {
                setIsFollowed(
                    friends.items.some((friend) => friend.userId === NumericId),
                );
            })
            .catch(() => {
                setIsFollowed(false);
            });
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
        dataStatusFriends,
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
                        offset: '',
                    }),
                );
            } else {
                void dispatch(
                    friendsActions.addFollowing({
                        followingId: id,
                        offset: '',
                    }),
                );
            }
            setIsFollowed((previousIsFollowed) => !previousIsFollowed);
        },
        [dispatch, isFollowed],
    );

    const handleSendMessage = useCallback(() => {
        const membersId = new Set([authorizedUser.id, NumericId]);

        const chatPayload = {
            membersId: [NumericId],
            isAssistant: false,
        };

        const existingChat = chats.find(({ users }) =>
            users.map(({ id }) => id).every((id) => membersId.has(id)),
        );

        if (existingChat) {
            const redirectPath = configureString(AppRoute.CHATS_$ID, {
                id: String(existingChat?.id),
            });

            return void navigate(redirectPath);
        }

        void dispatch(chatActionCreator.createChat(chatPayload))
            .unwrap()
            .then((result) => {
                navigate(
                    configureString(AppRoute.CHATS_$ID, {
                        id: String(result.id),
                    }),
                );
            });
    }, [authorizedUser, chats, dispatch, navigate, NumericId]);

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
                        message={handleSendMessage}
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
                                            color={IconColor.WHITE}
                                        />
                                    }
                                />
                            </li>
                            <li className="flex-1">
                                <ActivityWidget
                                    label="Total distance"
                                    value={`${metersToKilometers(totalDistance)} km`}
                                    color={ActivityWidgetColor.PURPLE}
                                    icon={
                                        <Icon
                                            name={IconName.stepsIcon}
                                            color={IconColor.WHITE}
                                        />
                                    }
                                />
                            </li>
                            <li className="flex-1">
                                <ActivityWidget
                                    label="Total duration"
                                    value={`${hours} hrs ${minutes} min ${seconds}`}
                                    color={ActivityWidgetColor.GREEN}
                                    icon={
                                        <Icon
                                            name={IconName.durationIcon}
                                            color={IconColor.WHITE}
                                        />
                                    }
                                />
                            </li>
                            <li className="flex-1">
                                <ActivityWidget
                                    label="Total calories"
                                    value={`${totalCalories} kcl`}
                                    color={ActivityWidgetColor.MAGENTA}
                                    icon={
                                        <Icon
                                            name={IconName.caloriesIcon}
                                            color={IconColor.WHITE}
                                        />
                                    }
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
