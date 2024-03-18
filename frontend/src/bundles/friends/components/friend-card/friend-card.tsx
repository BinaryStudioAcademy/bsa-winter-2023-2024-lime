import { UserCircleIcon } from '@heroicons/react/24/solid';

import { Button, Icon } from '~/bundles/common/components/components.js';
import {
    IconColor,
    IconName,
} from '~/bundles/common/components/icon/enums/enums.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type FriendResponseDto } from '~/bundles/friends/types/types.js';

type Properties = {
    isActive: boolean;
    isFollowed: boolean;
    isCardSelected: boolean;
    user: FriendResponseDto;
    selectCard: (user: FriendResponseDto | null) => void;
    onToggleFollow: (id: number) => void;
};

const FriendCard = ({
    isActive,
    isFollowed,
    isCardSelected,
    user,
    selectCard,
    onToggleFollow,
}: Properties): JSX.Element => {
    const { userId, fullName, email, avatarUrl } = user;

    const classes = {
        base: 'hover:border-buttonPrimary flex w-full min-w-[200px] flex-col rounded-xl border sm:max-w-40 lg:max-w-64 border-transparent',
        selected:
            'hover:border-buttonPrimary flex w-full min-w-[200px] flex-col rounded-xl border sm:max-w-40 lg:max-w-64 border-buttonPrimary ',
        followed:
            'text-action hover:border-buttonSecondary hover:text-buttonSecondary inline-flex items-center justify-center rounded-full border sm:h-7 sm:w-7 lg:h-10 lg:w-10',
        notFollowed:
            'text-lm-grey-200 inline-flex items-center justify-center rounded-full border sm:h-7 sm:w-7 lg:h-10 lg:w-10',
    };

    const handleOnToggleFollow = useCallback(() => {
        if (isCardSelected) {
            selectCard(null);
        }
        onToggleFollow(userId);
    }, [onToggleFollow, userId, isCardSelected, selectCard]);

    const handleSelectCard = useCallback((): void => {
        selectCard(user);
    }, [selectCard, user]);

    return (
        <div
            className={getValidClassNames(
                isCardSelected ? classes.selected : classes.base,
            )}
        >
            <div
                className="cursor-pointer"
                onClick={handleSelectCard}
                role="presentation"
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={fullName ?? 'avatar'}
                        className="aspect-square rounded-t-xl object-cover"
                    />
                ) : (
                    <div className="bg-lm-grey-100 flex aspect-square items-center justify-center rounded-t-xl">
                        <UserCircleIcon className="text-lm-grey-200 h-full w-full" />
                    </div>
                )}
            </div>
            <div className="bg-primary flex flex-col gap-2 rounded-b-xl p-4">
                <div className="flex items-center gap-2">
                    <div
                        className={`${isActive ? 'bg-buttonPrimary' : 'bg-buttonTertiary'} h-2 w-2 rounded-[50%]`}
                    />

                    <h3 className="text-primary font-extrabold sm:text-xs lg:text-[1rem]">
                        {fullName ?? email}
                    </h3>
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="inline-flex w-3/4 items-center">
                        <Button
                            onClick={handleOnToggleFollow}
                            label={isFollowed ? 'Unfollow' : 'Follow'}
                            className="sm:h-6 sm:px-1 sm:py-1  sm:text-[0.7rem] lg:h-8 lg:px-4 lg:py-2"
                            size={ComponentSize.SMALL}
                            variant={isFollowed ? 'secondary' : 'primary'}
                        />
                    </div>

                    <button
                        className={getValidClassNames(
                            isFollowed ? classes.followed : classes.notFollowed,
                        )}
                        disabled={!isFollowed}
                        title={
                            isFollowed
                                ? 'Send message'
                                : 'Follow to send message'
                        }
                    >
                        <Icon
                            name={IconName.messageIcon}
                            size={ComponentSize.MEDIUM}
                            color={
                                isFollowed
                                    ? IconColor.PRIMARY
                                    : IconColor.SECONDARY
                            }
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export { FriendCard };
