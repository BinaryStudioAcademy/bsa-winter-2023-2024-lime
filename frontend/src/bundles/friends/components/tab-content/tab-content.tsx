import { Button, Loader } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { FriendCard } from '~/bundles/friends/components/components.js';
import { IconColor } from '~/bundles/friends/enums/enums.js';
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
    isLoadingMore: boolean;
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
    isLoadingMore,
}: Properties): JSX.Element => {
    return (
        <>
            {users?.length > 0 &&
                users.map((user) => (
                    <FriendCard
                        key={user.userId}
                        user={user}
                        isFollowed={isFollowed}
                        isActive={true}
                        isCardSelected={selectedCardId === user.userId}
                        selectCard={selectCard}
                        onToggleFollow={onToggleFollow}
                    />
                ))}

            {(totalCount ?? 0) > users.length ? (
                <div className="absolute bottom-[-120px] left-1/2 w-[160px] -translate-x-1/2 transform pb-8">
                    <Button
                        onClick={loadMore}
                        label={'Load more'}
                        size={ComponentSize.MEDIUM}
                        leftIcon={
                            isLoadingMore && (
                                <Loader color={IconColor.PRIMARY} />
                            )
                        }
                        type="submit"
                        isDisabled={isLoadingMore}
                        variant={'secondary'}
                    />
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
