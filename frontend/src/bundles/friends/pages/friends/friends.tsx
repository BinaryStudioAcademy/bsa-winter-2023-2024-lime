import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    FriendDetails,
    TabContent,
    Tabs,
} from '~/bundles/friends/components/components.js';
import { TabsFollowers } from '~/bundles/friends/enums/enums.js';
import { actions as friendsActions } from '~/bundles/friends/store/friends.js';
import { type UserFollowingsResponseDto } from '~/bundles/friends/types/types.js';
import { actions as usersActions } from '~/bundles/users/store/users.js';

const Friends: React.FC = () => {
    const dispatch = useAppDispatch();

    const tabs = [TabsFollowers.FIND_FOLLOWINGS, TabsFollowers.MY_FOLLOWINGS];
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [selectedCard, setSelectedCard] =
        useState<UserFollowingsResponseDto | null>(null);

    const [activeTab, setActiveTab] = useState<string>(
        TabsFollowers.FIND_FOLLOWINGS,
    );

    const [users, setUsers] = useState<UserFollowingsResponseDto[]>([]);

    const currentUser = useAppSelector((state) => state.auth.user);
    const followings = useAppSelector((state) => state.friends.followings);

    const { users: allUsers, dataStatus: allUsersDataStatus } = useAppSelector(
        ({ users }) => ({
            users: users.users,
            dataStatus: users.dataStatus,
        }),
    );

    const handleSelectCard = useCallback(
        (id: number): void => {
            setSelectedCardId(id);
        },
        [setSelectedCardId],
    );

    const handleTabClick = useCallback(
        (tab: string): void => {
            setActiveTab(tab);
            setSelectedCard(null);
            setSelectedCardId(null);
        },
        [setActiveTab, setSelectedCard, setSelectedCardId],
    );

    const handleAddFollowing = useCallback(
        (id: number): void => {
            const addFollowing = async (id: number): Promise<void> => {
                await dispatch(
                    friendsActions.addFollowing({ followingId: id }),
                );
            };
            void addFollowing(id);
        },
        [dispatch],
    );

    const handleRemoveFollowing = useCallback(
        (id: number): void => {
            const removeFollowing = async (id: number): Promise<void> => {
                await dispatch(
                    friendsActions.removeFollowing({ followingId: id }),
                );
            };
            void removeFollowing(id);
        },
        [dispatch],
    );

    useEffect(() => {
        if (allUsersDataStatus === DataStatus.FULFILLED) {
            const notFollowedUsers = allUsers.filter(
                (user) =>
                    user.id !== currentUser?.id &&
                    !followings?.some(
                        (following) => following.userId === user.id,
                    ),
            );
            setUsers(
                notFollowedUsers as unknown as UserFollowingsResponseDto[],
            );
        }
    }, [setUsers, allUsers, currentUser, followings, allUsersDataStatus]);

    useEffect(() => {
        if (activeTab === TabsFollowers.FIND_FOLLOWINGS) {
            if (users) {
                setSelectedCard(
                    users.find((user) => user.id === selectedCardId) || null,
                );
            }
        } else {
            if (followings) {
                setSelectedCard(
                    followings.find(
                        (following) => following.userId === selectedCardId,
                    ) || null,
                );
            }
        }
    }, [selectedCardId, setSelectedCard, users, activeTab, followings]);

    useEffect(() => {
        const loadAllUsers = async (): Promise<void> => {
            await dispatch(usersActions.loadAll());
        };
        void loadAllUsers();
    }, [dispatch]);

    useEffect(() => {
        const loadFollowings = async (): Promise<void> => {
            await dispatch(friendsActions.getFollowings());
        };
        void loadFollowings();
    }, [dispatch]);

    return (
        <section className="relative flex flex-col gap-5 whitespace-normal">
            <Tabs
                tabs={tabs}
                handleTabClick={handleTabClick}
                activeTab={activeTab}
            />

            <div
                className={`flex flex-wrap items-start gap-5 ${selectedCardId ? 'w-[calc(100%-354px)]' : 'w-full'}`}
            >
                {activeTab === TabsFollowers.FIND_FOLLOWINGS && (
                    <TabContent
                        users={users}
                        isFollowed={false}
                        selectedCardId={selectedCardId}
                        selectCard={handleSelectCard}
                        onToggleFollow={handleAddFollowing}
                        noUsersText={'No user found to follow.'}
                    />
                )}

                {activeTab === TabsFollowers.MY_FOLLOWINGS && (
                    <TabContent
                        users={followings}
                        isFollowed={true}
                        selectedCardId={selectedCardId}
                        selectCard={handleSelectCard}
                        onToggleFollow={handleRemoveFollowing}
                        noUsersText={'You do not follow anyone yet.'}
                    />
                )}

                {activeTab === TabsFollowers.MY_FOLLOWERS && (
                    <div
                        className={
                            'text-primary flex h-[70vh] w-full items-center justify-center text-xl'
                        }
                    >
                        No one is following you yet.
                    </div>
                )}
            </div>

            {selectedCard && (
                <aside className="bg-secondary border-buttonText fixed right-[6px] top-[88px] ml-4 h-full w-[354px] border-l-2 pb-4 pl-4 pr-4 pt-8">
                    <FriendDetails
                        id={selectedCard.id}
                        isActive={true}
                        name={selectedCard.fullName || selectedCard.email}
                        avatarUrl={selectedCard.avatarUrl}
                    />
                </aside>
            )}
        </section>
    );
};

export { Friends };
