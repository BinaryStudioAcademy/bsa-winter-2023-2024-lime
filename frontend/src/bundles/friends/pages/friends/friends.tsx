import { Loader } from '~/bundles/common/components/components.js';
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
import {
    LIMIT,
    PAGE,
    TabsFollowers,
} from '~/bundles/friends/constants/constants.js';
import { actions as friendsActions } from '~/bundles/friends/store/friends.js';
import { type UserFollowingsResponseDto } from '~/bundles/friends/types/types.js';

const Friends: React.FC = () => {
    const dispatch = useAppDispatch();
    const tabs = [TabsFollowers.FIND_FOLLOWINGS, TabsFollowers.MY_FOLLOWINGS];
    const [limit, setLimit] = useState<number>(LIMIT);

    const [selectedCard, setSelectedCard] =
        useState<UserFollowingsResponseDto | null>(null);
    const [activeTab, setActiveTab] = useState<string>(
        TabsFollowers.FIND_FOLLOWINGS,
    );

    const users = useAppSelector((state) => state.friends.users);
    const isLoading = useAppSelector((state) => state.friends.dataStatus);
    const totalCount = useAppSelector((state) => state.friends.totalCount);

    const handleLoadMore = useCallback((): void => {
        setLimit(limit + LIMIT);
        const loadUsers = async (): Promise<void> => {
            activeTab === TabsFollowers.FIND_FOLLOWINGS &&
                (await dispatch(
                    friendsActions.getNotFollowed({
                        page: PAGE.toString(),
                        limit: (limit + LIMIT).toString(),
                    }),
                ));
            activeTab === TabsFollowers.MY_FOLLOWINGS &&
                (await dispatch(
                    friendsActions.getFollowings({
                        page: PAGE.toString(),
                        limit: (limit + LIMIT).toString(),
                    }),
                ));
        };
        void loadUsers();
    }, [setLimit, limit, dispatch, activeTab]);

    const handleSelectCard = useCallback(
        (user: UserFollowingsResponseDto | null): void => {
            setSelectedCard(user);
        },
        [setSelectedCard],
    );

    const handleTabClick = useCallback(
        (tab: string): void => {
            setLimit(LIMIT);
            setActiveTab(tab);
            setSelectedCard(null);
        },
        [setActiveTab, setSelectedCard, setLimit],
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
        const loadUsers = async (): Promise<void> => {
            activeTab === TabsFollowers.FIND_FOLLOWINGS &&
                (await dispatch(
                    friendsActions.getNotFollowed({
                        page: PAGE.toString(),
                        limit: limit.toString(),
                    }),
                ));
            activeTab === TabsFollowers.MY_FOLLOWINGS &&
                (await dispatch(
                    friendsActions.getFollowings({
                        page: PAGE.toString(),
                        limit: limit.toString(),
                    }),
                ));
        };
        void loadUsers();
    }, [dispatch, activeTab, limit]);

    return (
        <section className="relative flex flex-col gap-5 whitespace-normal">
            <Tabs
                tabs={tabs}
                handleTabClick={handleTabClick}
                activeTab={activeTab}
            />
            {isLoading === DataStatus.FULFILLED ? (
                <div
                    className={`flex flex-wrap items-start gap-5 ${selectedCard?.userId ? 'w-[calc(100%-354px)]' : 'w-full'}`}
                >
                    {activeTab === TabsFollowers.FIND_FOLLOWINGS && (
                        <TabContent
                            users={users}
                            isFollowed={false}
                            selectedCardId={selectedCard?.userId}
                            selectCard={handleSelectCard}
                            onToggleFollow={handleAddFollowing}
                            noUsersText={'No user found to follow.'}
                            totalCount={totalCount ?? 0}
                            loadMore={handleLoadMore}
                        />
                    )}

                    {activeTab === TabsFollowers.MY_FOLLOWINGS && (
                        <TabContent
                            users={users}
                            isFollowed={true}
                            selectedCardId={selectedCard?.userId}
                            selectCard={handleSelectCard}
                            onToggleFollow={handleRemoveFollowing}
                            noUsersText={'You do not follow anyone yet.'}
                            totalCount={totalCount}
                            loadMore={handleLoadMore}
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
            ) : (
                <div className={'flex h-[70vh]'}>
                    <Loader isOverflow={true} />
                </div>
            )}

            {selectedCard && (
                <aside className="bg-secondary border-buttonText fixed right-[6px] top-[88px] ml-4 h-full w-[354px] border-l-2 pb-4 pl-4 pr-4 pt-8">
                    <FriendDetails
                        id={selectedCard.userId}
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
