import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import {
    AchievementCard,
    Loader,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as userActions } from '~/bundles/users/store/users.js';

import { PersonalDetails } from '../../components/personal-details/personal-details.js';

type PublicProfileProperties = {
    id: number;
};
const ZERO_VALUE = 0;
const PublicProfile: React.FC<PublicProfileProperties> = ({ id }) => {
    const dispatch = useAppDispatch();
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        void dispatch(userActions.getById(id));
    }, [dispatch, id]);

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

    const isLoading =
        dataStatusUser === DataStatus.PENDING ||
        dataStatusAchievements === DataStatus.PENDING;

    useEffect(() => {
        void dispatch(achievementsActions.getAchievementsByUserId(id));
    }, [dispatch, id]);

    const handleToggleFriend = useCallback(() => {
        setIsFriend((previousIsFriend) => !previousIsFriend);
    }, []);

    const handleMessageFriend = useCallback(() => {}, []);
    if (isLoading) {
        return <Loader />;
    }
    if (user) {
        return (
            <div className="flex h-full w-full flex-row-reverse">
                <div>
                    <PersonalDetails
                        id={id}
                        user={user}
                        isFriend={isFriend}
                        toggleFriend={handleToggleFriend}
                        messageFriend={handleMessageFriend}
                    />
                </div>
                <div className="w-full">
                    <div className="text-primary">
                        Last Workout data
                        <br /> -Name of activity
                        <br /> -Distance
                        <br /> -Duration
                        <br />
                        -Datestamp of finishing
                    </div>
                    <div className="text-primary">
                        Statistics Section for current month <br /> -Wigets for:
                        <br /> -Total number of workouts <br /> -Total duration
                        of workouts <br /> -Total distance (in km or steps)
                        <br /> -Total calories concumed
                    </div>
                    <section>
                        <h2 className="text-lm-grey-200 mb-5 text-xl font-extrabold">
                            Achievements
                        </h2>

                        <div className="flex w-full flex-wrap gap-4">
                            {achievements?.length > ZERO_VALUE &&
                                achievements.map((achievement) => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                    />
                                ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
};

export { PublicProfile };
