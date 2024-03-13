import { FriendCard } from '~/bundles/friends/components/components.js';
import { type UserFollowingsResponseDto } from '~/bundles/friends/types/types.js';

type Properties = {
    users: UserFollowingsResponseDto[];
    isFollowed: boolean;
    selectedCardId: number | undefined;
    selectCard: (user: UserFollowingsResponseDto | null) => void;
    onToggleFollow: (id: number) => void;
    noUsersText: string;
};

const TabContent = ({
    users,
    isFollowed,
    selectedCardId,
    selectCard,
    onToggleFollow,
    noUsersText,
}: Properties): JSX.Element => {
    return (
        <>
            {users?.length > 0 ? (
                users.map((user) => (
                    <div key={user.id}>
                        <FriendCard
                            user={user}
                            isFollowed={isFollowed}
                            isActive={true}
                            isCardSelected={selectedCardId === user.id}
                            selectCard={selectCard}
                            onToggleFollow={onToggleFollow}
                        />
                    </div>
                ))
            ) : (
                <div
                    className={
                        'text-primary flex h-[70vh] w-full items-center justify-center text-xl'
                    }
                >
                    {noUsersText}
                </div>
            )}
        </>
    );
};

export { TabContent };
