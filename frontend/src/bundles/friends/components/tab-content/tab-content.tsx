import { FriendCard } from '~/bundles/friends/components/components.js';
import { type UserFollowingsResponseDto } from '~/bundles/friends/types/types.js';

type Properties = {
    users: UserFollowingsResponseDto[];
    isFollowed: boolean;
    selectedCardId: number | null;
    selectCard: (id: number) => void;
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
                            name={user.fullName || user.email}
                            id={user.id}
                            isFollowed={isFollowed}
                            isActive={true}
                            isCardSelected={selectedCardId === user.id}
                            selectCard={selectCard}
                            avatarUrl={user?.avatarUrl}
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
