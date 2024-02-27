import { ChatBubbleLeftEllipsisIcon as MessageIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';

import { Button, Icon } from '~/bundles/common/components/components.js';
import { addSizePropertyHeroIcons } from '~/bundles/common/components/icon/helpers/add-size-hero-icons.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

type FriendProperties = {
    id: number;
    name: string;
    avatar: string;
    isActive: boolean;
    isFriend: boolean;
    addFriend: (id: number) => void;
    messageFriend: (id: number) => void;
};

const FriendCard = ({
    id,
    name,
    avatar,
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

    const IconMessage = addSizePropertyHeroIcons({
        icon: <MessageIcon />,
        size: ComponentSize.SMALL,
    });

    const variantButton = isFriend ? 'secondary' : 'primary';
    const classesButtonResponsive =
        'lg:px-4 lg:py-2 lg:h-8  sm:text-[0.7rem] sm:h-6 sm:px-1 sm:py-1';
    const labelsButton = {
        add: 'Add friend',
        remove: 'Remove friend',
    };

    return (
        <div className="hover:border-buttonPrimary flex w-full flex-col rounded-xl border border-transparent sm:max-w-40 lg:max-w-64">
            <div className="h-3/4 w-full">
                <img
                    src={avatar}
                    alt={name}
                    className="aspect-square rounded-t-xl object-cover"
                />
            </div>
            <div className="bg-primary rounded-b-xl p-4">
                <div className="flex items-center gap-1">
                    <i className="flex h-4 w-4 items-center">
                        {isActive ? (
                            <Icon name="dotIcon" color="text-action" />
                        ) : (
                            <Icon name="dotIcon" color="text-lm-grey-200" />
                        )}
                    </i>
                    <h3 className="text-primary font-extrabold sm:text-xs lg:text-sm">
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
                        {IconMessage}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { FriendCard };
