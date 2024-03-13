import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    FriendCard,
    FriendDetails,
    Tabs,
} from '~/bundles/friends/components/components.js';
import { TabsFollowers } from '~/bundles/friends/enums/enums.js';
import { actions as friendsActions } from '~/bundles/friends/store/friends.js';
import { type UserFriendsResponseDto } from '~/bundles/friends/types/types.js';
import { actions as usersActions } from '~/bundles/users/store/users.js';

const Friends: React.FC = () => {
    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(
        null,
    );
    const [selectedFriend, setSelectedFriend] =
        useState<UserFriendsResponseDto | null>(null);

    const [activeTab, setActiveTab] = useState<string>(
        TabsFollowers.FIND_THE_FOLLOWERS,
    );

    const [users, setUsers] = useState<UserFriendsResponseDto[]>([]);

    const dispatch = useAppDispatch();

    const currentUser = useAppSelector((state) => state.auth.user);
    const { users: allUsers, dataStatus: allUsersDataStatus } = useAppSelector(
        ({ users }) => ({
            users: users.users,
            dataStatus: users.dataStatus,
        }),
    );

    const friends = useAppSelector((state) => state.friends.friends);

    const handleSelectCard = useCallback(
        (id: number): void => {
            setSelectedFriendId(id);
        },
        [setSelectedFriendId],
    );

    const handleTabClick = useCallback(
        (tab: string): void => {
            setActiveTab(tab);
            setSelectedFriend(null);
            setSelectedFriendId(null);
        },
        [setActiveTab, setSelectedFriend, setSelectedFriendId],
    );

    const handleAddFriend = useCallback(
        (id: number): void => {
            const addFriend = async (id: number): Promise<void> => {
                await dispatch(friendsActions.addFriend({ friendId: id }));
            };
            void addFriend(id);
        },
        [dispatch],
    );

    const handleRemoveFriend = useCallback(
        (id: number): void => {
            const removeFriend = async (id: number): Promise<void> => {
                await dispatch(friendsActions.removeFriend({ friendId: id }));
            };
            void removeFriend(id);
        },
        [dispatch],
    );

    useEffect(() => {
        if (allUsersDataStatus === DataStatus.FULFILLED) {
            const notFriends = allUsers.filter(
                (user) =>
                    user.id !== currentUser?.id &&
                    !friends.some((friend) => friend.userId === user.id),
            );
            setUsers(notFriends as unknown as UserFriendsResponseDto[]);
        }
    }, [setUsers, allUsers, currentUser, friends, allUsersDataStatus]);

    useEffect(() => {
        if (activeTab === TabsFollowers.FIND_THE_FOLLOWERS) {
            if (users) {
                setSelectedFriend(
                    users.find((user) => user.id === selectedFriendId) || null,
                );
            }
        } else {
            if (friends) {
                setSelectedFriend(
                    friends.find(
                        (friend) => friend.userId === selectedFriendId,
                    ) || null,
                );
            }
        }
    }, [selectedFriendId, setSelectedFriend, users, activeTab, friends]);

    useEffect(() => {
        const loadAllUsers = async (): Promise<void> => {
            await dispatch(usersActions.loadAll());
        };
        void loadAllUsers();
    }, [dispatch]);

    useEffect(() => {
        const loadAllFriends = async (): Promise<void> => {
            await dispatch(friendsActions.getFriends());
        };
        void loadAllFriends();
    }, [dispatch]);

    return (
        <section className="relative flex flex-col gap-5 whitespace-normal">
            <Tabs handleTabClick={handleTabClick} activeTab={activeTab} />

            <div
                className={`flex flex-wrap items-start gap-5 ${selectedFriendId ? 'w-[calc(100%-354px)]' : 'w-full'}`}
            >
                {activeTab === TabsFollowers.FIND_THE_FOLLOWERS &&
                    (users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id}>
                                <FriendCard
                                    name={user.fullName || user.email}
                                    id={user.id}
                                    isFollowed={false}
                                    isActive={true}
                                    isCardSelected={
                                        selectedFriendId === user.id
                                    }
                                    selectCard={handleSelectCard}
                                    avatarUrl={user?.avatarUrl}
                                    onToggleFollow={handleAddFriend}
                                />
                            </div>
                        ))
                    ) : (
                        <div>No user found to follow.</div>
                    ))}

                {activeTab === TabsFollowers.MY_FOLLOWERS &&
                    (friends.length > 0 ? (
                        friends.map((friend) => (
                            <div
                                key={friend.userId}
                                className={'cursor-pointer'}
                            >
                                <FriendCard
                                    name={friend.fullName || friend.email}
                                    id={friend.userId}
                                    isFollowed={true}
                                    isActive={true}
                                    isCardSelected={
                                        selectedFriendId === friend.userId
                                    }
                                    selectCard={handleSelectCard}
                                    avatarUrl={friend?.avatarUrl}
                                    onToggleFollow={handleRemoveFriend}
                                />
                            </div>
                        ))
                    ) : (
                        <div>You do not follow anyone yet.</div>
                    ))}

                {activeTab === TabsFollowers.FOLLOWING && (
                    <div>No one is following you yet.</div>
                )}
            </div>

            {selectedFriend && (
                <aside className="bg-secondary border-buttonText fixed right-[6px] top-[88px] ml-4 h-full w-[354px] border-l-2 pb-4 pl-4 pr-4 pt-8">
                    <FriendDetails
                        id={selectedFriend.id}
                        isActive={true}
                        name={selectedFriend.fullName || selectedFriend.email}
                        avatarUrl={selectedFriend.avatarUrl}
                    />
                </aside>
            )}
        </section>
    );
};

export { Friends };
