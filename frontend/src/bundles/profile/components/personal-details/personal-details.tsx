import { useCallback } from 'react';

import {
    ActivityIcon,
    Avatar,
    Button,
    Icon,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { IconName } from '~/bundles/common/components/icon/enums/icon-name.enum.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import {
    calculateAge,
    capitalizeFirstLetter,
    getUniqueValues,
} from '~/bundles/common/helpers/helpers.js';
import { type GoalResponseDto } from '~/bundles/goals/types/types.js';
import { type UserAuthResponseDto } from '~/bundles/users/types/types.js';

interface PersonalDetailsProperties {
    id: number;
    user: UserAuthResponseDto;
    goals: GoalResponseDto[];
    isFollowed: boolean;
    onFollowToggle: (id: number, isFollowed: boolean) => void;
    message: (id: number) => void;
}

const ZERO_VALUE = 0;
const PersonalDetails: React.FC<PersonalDetailsProperties> = ({
    id,
    user,
    goals,
    isFollowed,
    onFollowToggle,
    message,
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
        onFollowToggle(id, isFollowed);
    }, [onFollowToggle, isFollowed, id]);

    const handleSendMessage = useCallback(() => {
        message(id);
    }, [message, id]);
    return (
        <div className="bg-primary flex h-full w-[20rem] flex-col items-center rounded-lg px-6 py-8 shadow-xl sm:w-full  xl:w-[25rem]">
            <div className="lg:min-h-[7rem]">
                <Avatar size="lg" email={email} avatarUrl={avatarUrl} />
            </div>

            <h2 className="text-primary mt-5 text-3xl font-bold">{fullName}</h2>
            {username && <p className="text-primary mb-4">@{username}</p>}
            <div className="bg-secondary w-full rounded-lg p-4 shadow-xl">
                <ul className="flex w-full flex-wrap justify-evenly">
                    <li className="text-lm-grey-200 flex w-20 flex-col items-center sm:w-1/3 md:w-1/2 lg:w-1/3">
                        Weight
                        <p className="text-bold text-primary mt-2 text-xl">
                            {weight ?? '-'}
                        </p>
                    </li>
                    <li className="text-lm-grey-200 flex w-20 flex-col items-center sm:w-1/3 md:w-1/2 lg:w-1/3">
                        Height
                        <p className="text-primary text-bold mt-2 text-xl">
                            {height ?? '-'}
                        </p>
                    </li>
                    <li className="text-lm-grey-200 flex w-20 flex-col items-center justify-end sm:w-1/3 md:w-1/2 lg:w-1/3">
                        Age
                        <p className="text-bold text-primary mt-2 text-xl">
                            {calculateAge(dateOfBirth) ?? '-'}
                        </p>
                    </li>
                    <li className="text-lm-grey-200 mt-4 flex flex-col items-center sm:w-1/2 lg:w-20 min-[1400px]:w-1/2">
                        Gender
                        <p className="text-bold text-primary mt-2 text-xl">
                            {gender ?? '-'}
                        </p>
                    </li>
                    <li className="text-lm-grey-200 mt-4 flex flex-col items-center sm:w-1/2 lg:w-20 min-[1400px]:w-1/2">
                        Location
                        <p className="text-bold text-primary mt-2 text-xl">
                            Kyiv
                        </p>
                    </li>
                </ul>
            </div>
            <div className="my-6 w-full overflow-auto">
                <h2 className="text-primary">Preferences</h2>
                <ul className="mt-2 grid w-full gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                    {goals && goals.length > ZERO_VALUE ? (
                        getUniqueValues(goals, 'activityType').map((goal) => (
                            <li
                                key={goal.id}
                                className="text-primary bg-secondary mt-2 rounded-lg p-2 sm:flex sm:items-center lg:flex lg:w-full lg:flex-col lg:items-center xl:flex-row"
                            >
                                <ActivityIcon
                                    activityType={goal.activityType}
                                    size={ComponentSize.SMALL}
                                />
                                <p className="ml-4 md:ml-0 lg:ml-4">
                                    {capitalizeFirstLetter(goal.activityType)}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-lm-grey-200 mt-2">
                            No goals defined
                        </p>
                    )}
                </ul>
            </div>

            <div className=" mt-8 flex h-14 w-full items-center justify-between">
                <div className="inline-flex w-2/3 items-center sm:w-3/5">
                    <Button
                        onClick={handleToggleFriend}
                        label={isFollowed ? 'Unfollow' : 'Follow'}
                        className="sm:h-10 sm:px-1 sm:py-1 sm:text-[0.7rem] lg:h-11 lg:px-4 lg:py-2"
                        size={ComponentSize.LARGE}
                        variant={isFollowed ? 'secondary' : 'primary'}
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    className={`${isFollowed ? 'text-action hover:border-buttonSecondary hover:text-buttonSecondary' : 'text-lm-grey-200'}  inline-flex items-center justify-center rounded-full border sm:h-14 sm:w-14 lg:h-11 lg:w-11`}
                    disabled={!isFollowed}
                    title={
                        isFollowed ? 'Send message' : 'Follow to send message'
                    }
                >
                    <Icon
                        name={IconName.messageIcon}
                        size={ComponentSize.MEDIUM}
                        color={
                            isFollowed ? IconColor.PRIMARY : IconColor.SECONDARY
                        }
                    />
                </button>
            </div>
        </div>
    );
};

export { PersonalDetails };
