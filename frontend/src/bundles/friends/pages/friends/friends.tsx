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
import { type UserGetAllItemResponseDto } from '~/bundles/friends/types/types.js';
import { actions as usersActions } from '~/bundles/users/store/users.js';

const Friends: React.FC = () => {
    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(
        null,
    );
    const [selectedFriend, setSelectedFriend] =
        useState<UserGetAllItemResponseDto | null>(null);
    const [isTabActive, setIsTabActive] = useState(true);

    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);

    const handleSelectCard = useCallback((id: number): void => {
        setSelectedFriendId(id);
    }, []);

    const handleToggleFindFriendsTab = useCallback((): void => {
        setIsTabActive(true);
    }, [setIsTabActive]);

    const handleToggleMyFriendsTab = useCallback((): void => {
        setIsTabActive(false);
    }, [setIsTabActive]);

    useEffect(() => {
        setSelectedFriend(
            users.find((user) => user.id === selectedFriendId) || null,
        );
    }, [selectedFriendId, setSelectedFriend, users]);

    useEffect(() => {
        const loadAllUsers = async (): Promise<void> => {
            await dispatch(usersActions.loadAll());
        };
        void loadAllUsers();
    }, [dispatch]);

    return (
        <section className={'relative flex flex-col gap-5'}>
            <div
                className={
                    'text-secondary bg-secondary rounded-34 flex max-w-[326px] justify-between font-semibold leading-4 '
                }
            >
                <div
                    onClick={handleToggleFindFriendsTab}
                    className={`transition-bg rounded-34 w-[168px] cursor-pointer px-4 py-3 text-center duration-300 ${isTabActive ? 'bg-tertiary' : ''}`}
                    role="presentation"
                >
                    Find the friends
                </div>

                <div
                    onClick={handleToggleMyFriendsTab}
                    className={`transition-bg rounded-34 w-[168px] cursor-pointer px-4 py-3 text-center duration-300 ${isTabActive ? '' : 'bg-tertiary'}`}
                    role="presentation"
                >
                    My friends
                </div>
            </div>

            <div
                className={`flex flex-wrap items-start gap-5 ${selectedFriendId ? 'w-[calc(100%-354px)]' : 'w-full'}`}
            >
                {users.map((user) => (
                    <div key={user.id} className={'cursor-pointer'}>
                        <FriendCard
                            name={user.email}
                            id={user.id}
                            isFriend={false}
                            isActive={true}
                            isSelected={selectedFriendId === user.id}
                            handleSelectCard={handleSelectCard}
                            avatarUrl={
                                'https://cdn.galleries.smcloud.net/t/galleries/gf-pgjw-nacx-mdJT_joga-cwiczenia-efekty-i-odmiany-jogi-co-daje-joga-664x442.jpg'
                            }
                        />
                    </div>
                ))}
            </div>

            {selectedFriend && (
                <aside className="bg-primary border-buttonText fixed right-[6px] top-[88px] ml-4 h-full w-[354px] border-l-2 pb-4 pl-4 pr-4 pt-8">
                    <FriendDetails
                        id={selectedFriend.id}
                        isActive={true}
                        name={selectedFriend.email}
                        avatarUrl={
                            'https://cdn.galleries.smcloud.net/t/galleries/gf-pgjw-nacx-mdJT_joga-cwiczenia-efekty-i-odmiany-jogi-co-daje-joga-664x442.jpg'
                        }
                    />
                </aside>
            )}
        </section>
    );
};

export { Friends };
