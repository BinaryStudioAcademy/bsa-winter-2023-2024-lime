import { UserCircleIcon } from '@heroicons/react/24/solid';

import { Button, Icon } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { validateImageUrl } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

type FriendProperties = {
    id: number;
    name: string;
    avatarUrl: string;
    isActive: boolean;
    isFriend: boolean;
    addFriend: (id: number) => void;
    messageFriend: (id: number) => void;
};

const FriendCard = ({
    id,
    name,
    avatarUrl,
    isActive,
    isFriend,
    addFriend,
    messageFriend,
}: FriendProperties): JSX.Element => {
    const handleAddFriend = useCallback(() => {
        addFriend(id);
    }, [addFriend, id]);

    const handleSendMessage = useCallback(() => {
        messageFriend(id);
    }, [messageFriend, id]);

    const variantButton = isFriend ? 'secondary' : 'primary';
    const classesButtonResponsive =
        'lg:px-4 lg:py-2 lg:h-8  sm:text-[0.7rem] sm:h-6 sm:px-1 sm:py-1';
    const labelsButton = {
        add: 'Add friend',
        remove: 'Remove friend',
    };
    const icon = 'messageIcon';
    const size = 'sm';

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
                        {isFriend ? (
                            <Button
                                onClick={handleAddFriend}
                                label={labelsButton.remove}
                                className={classesButtonResponsive}
                                size={ComponentSize.SMALL}
                                variant={variantButton}
                            />
                        ) : (
                            <Button
                                onClick={handleAddFriend}
                                label={labelsButton.add}
                                className={classesButtonResponsive}
                                size={ComponentSize.SMALL}
                                variant={variantButton}
                            />
                        )}
                    </div>

                    <button
                        onClick={handleSendMessage}
                        className="text-action hover:border-buttonSecondary hover:text-buttonSecondary inline-flex items-center justify-center rounded-full border sm:h-7 sm:w-7 lg:h-10 lg:w-10"
                    >
                        <Icon name={icon} size={size} className="text-action" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export { FriendCard };
