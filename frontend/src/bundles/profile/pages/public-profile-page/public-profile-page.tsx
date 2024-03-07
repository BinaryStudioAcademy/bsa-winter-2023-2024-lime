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
const PublicProfile: React.FC<PublicProfileProperties> = ({ id }) => {
    const dispatch = useAppDispatch();
    const [isFriend, setIsFriend] = useState(false);

    const handleToggleFriend = useCallback(() => {
        setIsFriend((previousIsFriend) => !previousIsFriend);
    }, []);

    const handleMessageFriend = useCallback(() => {}, []);

    useEffect(() => {
        void dispatch(userActions.getById(id));
    }, [dispatch, id]);

    const { user } = useAppSelector(({ users }) => ({
        user: users.user,
    }));

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
                    <div className="text-primary"> Achievements section</div>
                </div>
            </div>
        );
    }
};

export { PublicProfile };
