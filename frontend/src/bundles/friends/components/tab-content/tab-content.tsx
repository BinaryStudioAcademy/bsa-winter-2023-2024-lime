import { Button } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { FriendCard } from '~/bundles/friends/components/components.js';
import { type FriendResponseDto } from '~/bundles/friends/types/types.js';

type Properties = {
    users: FriendResponseDto[];
    isFollowed: boolean;
    selectedCardId: number | undefined;
    selectCard: (user: FriendResponseDto | null) => void;
    onToggleFollow: (id: number) => void;
    noUsersText: string;
    totalCount: number | undefined;
    loadMore: () => void;
};

const TabContent = ({
    users,
    isFollowed,
    selectedCardId,
    selectCard,
    onToggleFollow,
    noUsersText,
    totalCount,
    loadMore,
}: Properties): JSX.Element => {
    return (
        <>
            {users?.length > 0 &&
                users.map((user) => (
                    <div key={user.userId}>
                        <FriendCard
                            user={user}
                            isFollowed={isFollowed}
                            isActive={true}
                            isCardSelected={selectedCardId === user.userId}
                            selectCard={selectCard}
                            onToggleFollow={onToggleFollow}
                        />
                    </div>
                ))}

            {(totalCount ?? 0) > users.length ? (
                <div className="mt-6 flex w-full justify-center">
                    <div className="w-[160px]">
                        <Button
                            onClick={loadMore}
                            label={'Load more'}
                            size={ComponentSize.MEDIUM}
                            variant={'secondary'}
                        />
                    </div>
                </div>
            ) : (
                users?.length <= 0 && (
                    <div className="text-primary flex h-[70vh] w-full items-center justify-center text-xl">
                        {noUsersText}
                    </div>
                )
            )}
        </>
    );
};

export { TabContent };
