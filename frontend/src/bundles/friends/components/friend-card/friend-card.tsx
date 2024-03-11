import { UserCircleIcon } from '@heroicons/react/24/solid';

import { Button, Icon } from '~/bundles/common/components/components.js';
import {
    IconColor,
    IconName,
} from '~/bundles/common/components/icon/enums/enums.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { validateImageUrl } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

type FriendProperties = {
    id: number;
    name: string;
    avatarUrl: string;
    isActive: boolean;
    isFriend: boolean;
    isSelected: boolean;
    handleSelectCard: (id: number) => void;
    // toggleFriend: (id: number, isFriend: boolean) => void;
    // messageFriend: (id: number) => void;
};

const FriendCard = ({
    id,
    name,
    avatarUrl,
    isActive,
    isFriend,
    isSelected,
    handleSelectCard,
    // toggleFriend,
    // messageFriend,
}: FriendProperties): JSX.Element => {
    // const handletoggleFriend = useCallback(() => {
    //     toggleFriend(id, isFriend);
    // }, [toggleFriend, isFriend, id]);
    //
    // const handleSendMessage = useCallback(() => {
    //     messageFriend(id);
    // }, [messageFriend, id]);

    const handleClick = useCallback((): void => {
        handleSelectCard(id);
    }, [handleSelectCard, id]);

    return (
        <div
            className={`hover:border-buttonPrimary flex h-[330px] w-[235px] flex-col overflow-hidden rounded-xl border ${isSelected ? 'border-buttonPrimary' : 'border-transparent'}`}
            onClick={handleClick}
            role="presentation"
        >
            <div className="h-[227px] w-full object-cover">
                {validateImageUrl(avatarUrl) ? (
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="aspect-square rounded-t-xl object-cover "
                    />
                ) : (
                    <div className="bg-lm-grey-100 flex aspect-square h-[227px] items-center justify-center rounded-t-xl">
                        <UserCircleIcon className="text-lm-grey-200 h-full w-full" />
                    </div>
                )}
            </div>
            <div className="bg-secondary flex h-full flex-col gap-2 rounded-b-xl p-4">
                <div className="flex items-center gap-2">
                    {isActive ? (
                        <div className="bg-buttonPrimary h-2 w-2 rounded-[50%]" />
                    ) : (
                        <div className="bg-buttonTertiary h-2 w-2 rounded-[50%]" />
                    )}

                    <h3 className="text-primary font-extrabold sm:text-xs lg:text-[1rem]">
                        {name}
                    </h3>
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="inline-flex w-3/4 items-center">
                        {isFriend ? (
                            <Button
                                // onClick={handletoggleFriend}
                                label={'Remove friend'}
                                className="sm:h-6 sm:px-1 sm:py-1  sm:text-[0.7rem] lg:h-8 lg:px-4 lg:py-2"
                                size={ComponentSize.SMALL}
                                variant={isFriend ? 'secondary' : 'primary'}
                            />
                        ) : (
                            <Button
                                // onClick={handletoggleFriend}
                                label={'Add friend'}
                                className="sm:h-6 sm:px-1 sm:py-1  sm:text-[0.7rem] lg:h-8 lg:px-4 lg:py-2"
                                size={ComponentSize.SMALL}
                                variant={isFriend ? 'secondary' : 'primary'}
                            />
                        )}
                    </div>

                    <button
                        // onClick={handleSendMessage}
                        className="text-action hover:border-buttonSecondary hover:text-buttonSecondary inline-flex items-center justify-center rounded-full border sm:h-7 sm:w-7 lg:h-10 lg:w-10"
                        disabled={!isFriend}
                    >
                        <Icon
                            name={IconName.messageIcon}
                            size={ComponentSize.MEDIUM}
                            color={
                                isFriend
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
