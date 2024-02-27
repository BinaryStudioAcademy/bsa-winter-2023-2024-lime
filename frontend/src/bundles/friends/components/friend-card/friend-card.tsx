import { ChatBubbleLeftEllipsisIcon as MessageIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';

import { Button } from '~/bundles/common/components/components.js';
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

    return (
        <div className="rounded-34 flex w-full max-w-64 flex-col">
            <div className="h-3/4 w-full">
                <img
                    src={avatar}
                    alt={name}
                    className="aspect-square rounded-t-xl object-cover"
                />
            </div>
            <div className="bg-primary rounded-b-xl p-4">
                <div className="flex gap-1 items-center">
                    <i className="h-4 w-4 text-[0.5rem] flex items-center">{isActive ? '🟢' : '🔴'}</i>
                    <h3 className="text-primary font-extrabold">{name}</h3>
                </div>
                <div className="flex w-full justify-between">
                    <div className="inline-flex w-3/4 items-center">
                        {isFriend ? (
                            <Button
                                onClick={handleAddFriend}
                                label="Remove friend"
                                size={ComponentSize.SMALL}
                                variant="primary"
                            />
                        ) : (
                            <Button
                                onClick={handleAddFriend}
                                label="Add friend"
                                size={ComponentSize.SMALL}
                                variant="primary"
                            />
                        )}
                    </div>

                    <button
                        onClick={handleSendMessage}
                        className="text-action inline-flex h-10 w-10 items-center justify-center rounded-full border"
                    >
                        {IconMessage}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { FriendCard };
