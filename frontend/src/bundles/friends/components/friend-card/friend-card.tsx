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
    isFollow: boolean;
    toggleFollow: (id: number, isFollow: boolean) => void;
    message: (id: number) => void;
};

const FriendCard = ({
    id,
    name,
    avatarUrl,
    isActive,
    isFollow,
    toggleFollow,
    message,
}: FriendProperties): JSX.Element => {
    const handletoggleFollow = useCallback(() => {
        toggleFollow(id, isFollow);
    }, [toggleFollow, isFollow, id]);

    const handleSendMessage = useCallback(() => {
        message(id);
    }, [message, id]);

    return (
        <div className="hover:border-buttonPrimary flex w-full flex-col rounded-xl border border-transparent sm:max-w-40 lg:max-w-64">
            <div className="h-3/4 w-full">
                {validateImageUrl(avatarUrl) ? (
                    <img
                        src={avatarUrl}
                        alt={name}
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
                        {isFollow ? (
                            <Button
                                onClick={handletoggleFollow}
                                label={'Unfollow'}
                                className="sm:h-6 sm:px-1 sm:py-1  sm:text-[0.7rem] lg:h-8 lg:px-4 lg:py-2"
                                size={ComponentSize.SMALL}
                                variant="secondary"
                            />
                        ) : (
                            <Button
                                onClick={handletoggleFollow}
                                label={'Follow'}
                                className="sm:h-6 sm:px-1 sm:py-1  sm:text-[0.7rem] lg:h-8 lg:px-4 lg:py-2"
                                size={ComponentSize.SMALL}
                                variant="primary"
                            />
                        )}
                    </div>

                    <button
                        onClick={handleSendMessage}
                        className="text-action hover:border-buttonSecondary hover:text-buttonSecondary inline-flex items-center justify-center rounded-full border sm:h-7 sm:w-7 lg:h-10 lg:w-10"
                        disabled={!isFollow}
                    >
                        <Icon
                            name={IconName.messageIcon}
                            size={ComponentSize.MEDIUM}
                            color={
                                isFollow
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
