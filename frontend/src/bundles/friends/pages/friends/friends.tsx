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
} from '~/bundles/friends/components/components.js';
import { actions as friendsActions } from '~/bundles/friends/store/friends.js';
import { type UserFriendsResponseDto } from '~/bundles/friends/types/types.js';
import { actions as usersActions } from '~/bundles/users/store/users.js';

const Friends: React.FC = () => {
    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(
        null,
    );
    const [selectedFriend, setSelectedFriend] =
        useState<UserFriendsResponseDto | null>(null);
    const [isTabAllUsersActive, setIsTabAllUsersActive] =
        useState<boolean>(true);
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

    const handleToggleFindFriendsTab = useCallback((): void => {
        setIsTabAllUsersActive(true);
        setSelectedFriend(null);
        setSelectedFriendId(null);
    }, [setIsTabAllUsersActive, setSelectedFriend, setSelectedFriendId]);

    const handleToggleMyFriendsTab = useCallback((): void => {
        setIsTabAllUsersActive(false);
        setSelectedFriend(null);
        setSelectedFriendId(null);
    }, [setIsTabAllUsersActive, setSelectedFriend, setSelectedFriendId]);

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
        isTabAllUsersActive
            ? users &&
              setSelectedFriend(
                  users.find((user) => user.id === selectedFriendId) || null,
              )
            : friends &&
              setSelectedFriend(
                  friends.find(
                      (friend) => friend.userId === selectedFriendId,
                  ) || null,
              );
    }, [
        selectedFriendId,
        setSelectedFriend,
        users,
        isTabAllUsersActive,
        friends,
    ]);

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
        <section className={'relative flex flex-col gap-5'}>
            <div
                className={
                    'text-secondary bg-secondary rounded-34 flex max-w-[346px] justify-between font-semibold leading-4 '
                }
            >
                <div
                    onClick={handleToggleFindFriendsTab}
                    className={`transition-bg rounded-34 w-[178px] cursor-pointer px-4 py-3 text-center duration-300 ${isTabAllUsersActive ? 'bg-tertiary' : ''}`}
                    role="presentation"
                >
                    Find the followers
                </div>

                <div
                    onClick={handleToggleMyFriendsTab}
                    className={`transition-bg rounded-34 w-[178px] cursor-pointer px-4 py-3 text-center duration-300 ${isTabAllUsersActive ? '' : 'bg-tertiary'}`}
                    role="presentation"
                >
                    My followers
                </div>
            </div>

            <div
                className={`flex flex-wrap items-start gap-5 ${selectedFriendId ? 'w-[calc(100%-354px)]' : 'w-full'}`}
            >
                {isTabAllUsersActive ? (
                    users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id}>
                                <FriendCard
                                    name={user.fullName}
                                    id={user.id}
                                    isFriend={false}
                                    isActive={true}
                                    isSelected={selectedFriendId === user.id}
                                    handleSelectCard={handleSelectCard}
                                    avatarUrl={user?.avatarUrl}
                                    toggleFriend={handleAddFriend}
                                />
                            </div>
                        ))
                    ) : (
                        <div className={'text-secondary'}>
                            No user found to follow.
                        </div>
                    )
                ) : (friends.length > 0 ? (
                    friends.map((friend) => (
                        <div key={friend.userId} className={'cursor-pointer'}>
                            <FriendCard
                                name={friend.fullName}
                                id={friend.userId}
                                isFriend={true}
                                isActive={true}
                                isSelected={selectedFriendId === friend.userId}
                                handleSelectCard={handleSelectCard}
                                avatarUrl={friend?.avatarUrl}
                                toggleFriend={handleRemoveFriend}
                            />
                        </div>
                    ))
                ) : (
                    <div className={'text-secondary'}>
                        You do not have any friends yet.
                    </div>
                ))}
            </div>

            {selectedFriend && (
                <aside className="bg-primary border-buttonText fixed right-[6px] top-[88px] ml-4 h-full w-[354px] border-l-2 pb-4 pl-4 pr-4 pt-8">
                    <FriendDetails
                        id={selectedFriend.id}
                        isActive={true}
                        name={selectedFriend.fullName}
                        avatarUrl={selectedFriend.avatarUrl}
                    />
                </aside>
            )}
        </section>
    );
};

export { Friends };
