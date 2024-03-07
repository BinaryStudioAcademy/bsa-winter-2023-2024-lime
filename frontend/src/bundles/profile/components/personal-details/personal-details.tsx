import { useCallback } from 'react';

import {
    Avatar,
    Button,
    Icon,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { IconName } from '~/bundles/common/components/icon/enums/icon-name.enum.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { calculateAge } from '~/bundles/common/helpers/helpers.js';
import { type UserAuthResponseDto } from '~/bundles/users/types/types.js';

interface PersonalDetailsProperties {
    id: number;
    user: UserAuthResponseDto;
    isFriend: boolean;
    toggleFriend: (id: number, isFriend: boolean) => void;
    messageFriend: (id: number) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProperties> = ({
    id,
    user,
    isFriend,
    toggleFriend,
    messageFriend,
}) => {
    const {
        email,
        fullName,
        avatarUrl,
        username,
        dateOfBirth,
        weight,
        height,
        gender,
    } = user;

    const handleToggleFriend = useCallback(() => {
        toggleFriend(id, isFriend);
    }, [toggleFriend, isFriend, id]);

    const handleSendMessage = useCallback(() => {
        messageFriend(id);
    }, [messageFriend, id]);
    return (
        <div className="bg-lm-black-100 flex h-full w-[20rem] flex-col items-center rounded-lg px-6 py-8 shadow-xl">
            <Avatar size="lg" email={email} avatarUrl={avatarUrl} />

            <h2 className="text-primary mt-5 text-3xl font-bold">{fullName}</h2>
            {username && <p className="text-primary mb-4">@{username}</p>}
            <div className="bg-primary w-full rounded-lg p-4 shadow-xl">
                <ul className="flex w-full flex-wrap justify-evenly">
                    <li className="text-lm-grey-200 flex w-20 flex-col items-center">
                        Weight
                        <p className="text-bold text-primary mt-2 text-xl">
                            {weight ?? '-'}
                        </p>
                    </li>
                    <li className="text-lm-grey-200 flex w-20 flex-col  items-center">
                        Height
                        <p className="text-primary text-bold mt-2 text-xl">
                            {height ?? '-'}
                        </p>
                    </li>
                    <li className="text-lm-grey-200 flex w-20 flex-col  items-center">
                        Age
                        <p className="text-bold text-primary mt-2 text-xl">
                            {calculateAge(dateOfBirth) ?? '-'}
                        </p>
                    </li>
                    <li className="text-lm-grey-200 mt-4 flex w-1/2 flex-col items-center">
                        Gender
                        <p className="text-bold text-primary mt-2 text-xl">
                            {gender ?? '-'}
                        </p>
                    </li>
                    <li className="text-lm-grey-200 mt-4 flex w-1/2 flex-col items-center">
                        Location
                        <p className="text-bold text-primary mt-2 text-xl">
                            Kyiv
                        </p>
                    </li>
                </ul>
            </div>
            <p className="text-primary mt-6">Preferences:</p>

            <div className="mt-auto flex h-14 w-full items-center justify-between">
                <div className="inline-flex w-2/3 items-center">
                    <Button
                        onClick={handleToggleFriend}
                        label={isFriend ? 'Remove friend' : 'Add Friend'}
                        className="sm:h-6 sm:px-1 sm:py-1 sm:text-[0.7rem] lg:h-11 lg:px-4 lg:py-2"
                        size={ComponentSize.LARGE}
                        variant={isFriend ? 'secondary' : 'primary'}
                    />
                </div>

                <button
                    onClick={handleSendMessage}
                    className="text-action hover:border-buttonSecondary hover:text-buttonSecondary inline-flex items-center justify-center rounded-full border sm:h-7 sm:w-7 lg:h-11 lg:w-11"
                    disabled={!isFriend}
                >
                    <Icon
                        name={IconName.messageIcon}
                        size={ComponentSize.MEDIUM}
                        color={
                            isFriend ? IconColor.PRIMARY : IconColor.SECONDARY
                        }
                        className="cursor-pointer"
                    />
                </button>
            </div>
        </div>
    );
};

export { PersonalDetails };
