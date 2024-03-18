import { DataStatus } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
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
import { FriendsApiPath } from '~/bundles/friends/enums/enums.js';
import { actions as friendsActions } from '~/bundles/friends/store/friends.js';
import { type FriendResponseDto } from '~/bundles/friends/types/types.js';

const Friends: React.FC = () => {
    const dispatch = useAppDispatch();
    const tabs = [TabsFollowers.FIND_FOLLOWINGS, TabsFollowers.MY_FOLLOWINGS];
    const [page, setPage] = useState<number>(PAGE);
    const [detailsAsideStyle, setDetailsAsideStyle] = useState({
        transform: 'translateX(110%)',
    });

    const [selectedCard, setSelectedCard] = useState<FriendResponseDto | null>(
        null,
    );
    const [activeTab, setActiveTab] = useState<string>(
        TabsFollowers.FIND_FOLLOWINGS,
    );

    const {
        users,
        dataStatus: isLoading,
        totalCount,
    } = useAppSelector(({ friends }) => friends);

    const classes = {
        detailsAside:
            'bg-secondary border-secondary fixed right-[6px] top-[88px] ml-4 flex h-full w-full flex-col border-l-2 pb-4 pl-4 pr-4 pt-8 transition duration-500 md:max-w-[254px] lg:max-w-[354px]',
        animation: 'transition-transform duration-[0.5s] ease-[ease-in-out]',
    };

    const handleLoadMore = useCallback((): void => {
        setPage(page + 1);

        activeTab === TabsFollowers.FIND_FOLLOWINGS &&
            void dispatch(
                friendsActions.loadMore({
                    page: String(page + 1),
                    limit: String(LIMIT),
                    path: FriendsApiPath.ROOT,
                }),
            );

        activeTab === TabsFollowers.MY_FOLLOWINGS &&
            void dispatch(
                friendsActions.loadMore({
                    page: String(page + 1),
                    limit: String(LIMIT),
                    path: FriendsApiPath.FOLLOWINGS,
                }),
            );
    }, [setPage, page, dispatch, activeTab]);

    const handleSelectCard = useCallback(
        (user: FriendResponseDto | null): void => {
            setSelectedCard(user);
        },
        [setSelectedCard],
    );

    const handleTabClick = useCallback(
        (tab: string): void => {
            setPage(PAGE);
            setActiveTab(tab);
            setSelectedCard(null);
        },
        [setActiveTab, setSelectedCard, setPage],
    );

    const handleAddFollowing = useCallback(
        (id: number): void => {
            void dispatch(
                friendsActions.addFollowing({
                    followingId: id,
                    offset: String(page * LIMIT),
                }),
            );
        },
        [dispatch, page],
    );

    const handleRemoveFollowing = useCallback(
        (id: number): void => {
            void dispatch(
                friendsActions.removeFollowing({
                    followingId: id,
                    offset: String(page * LIMIT),
                }),
            );
        },
        [dispatch, page],
    );

    useEffect(() => {
        const loadUsers = async (): Promise<void> => {
            activeTab === TabsFollowers.FIND_FOLLOWINGS &&
                (await dispatch(
                    friendsActions.getNotFollowed({
                        page: PAGE.toString(),
                        limit: LIMIT.toString(),
                    }),
                ));
            activeTab === TabsFollowers.MY_FOLLOWINGS &&
                (await dispatch(
                    friendsActions.getFollowings({
                        page: PAGE.toString(),
                        limit: LIMIT.toString(),
                    }),
                ));
        };
        void loadUsers();
    }, [dispatch, activeTab]);

    useEffect(() => {
        selectedCard
            ? setDetailsAsideStyle({ transform: 'translateX(0)' })
            : setDetailsAsideStyle({ transform: 'translateX(110%)' });
    }, [selectedCard]);

    return (
        <section className="relative flex flex-col gap-5 whitespace-normal">
            <Tabs
                tabs={tabs}
                handleTabClick={handleTabClick}
                activeTab={activeTab}
            />
            <div
                className={`flex flex-wrap items-start justify-stretch gap-5 ${selectedCard?.userId ? 'md:w-[calc(100%-254px)] lg:w-[calc(100%-354px)]' : 'w-full'}`}
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
                        isLoading={isLoading === DataStatus.PENDING}
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
                        isLoading={isLoading === DataStatus.PENDING}
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

            <aside
                className={getValidClassNames(
                    classes.detailsAside,
                    classes.animation,
                )}
                style={detailsAsideStyle}
            >
                {selectedCard && (
                    <FriendDetails
                        id={selectedCard.userId}
                        isActive={true}
                        name={selectedCard.fullName ?? selectedCard.email}
                        avatarUrl={selectedCard.avatarUrl}
                        setSelectedCard={setSelectedCard}
                    />
                )}
            </aside>
        </section>
    );
};

export { Friends };
