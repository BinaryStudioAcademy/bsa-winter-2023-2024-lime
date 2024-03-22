import { UserCircleIcon } from '@heroicons/react/24/solid';

import { actions as chatActionCreator } from '~/bundles/chats/store/chats.js';
import { Button, Icon } from '~/bundles/common/components/components.js';
import {
    IconColor,
    IconName,
} from '~/bundles/common/components/icon/enums/enums.js';
import { AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import {
    type FriendResponseDto,
    type UserAuthResponseDto,
} from '~/bundles/friends/types/types.js';

type Properties = {
    isActive: boolean;
    isFollowed: boolean;
    isCardSelected: boolean;
    user: FriendResponseDto;
    selectCard: (user: FriendResponseDto | null) => void;
    onToggleFollow: (id: number, idAdding?: boolean) => void;
};

const FriendCard = ({
    isActive,
    isFollowed,
    isCardSelected,
    user,
    selectCard,
    onToggleFollow,
}: Properties): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user: authorizedUser } = useAppSelector(({ auth }) => auth) as {
        user: UserAuthResponseDto;
    };

    const { chats } = useAppSelector(({ chats }) => chats);

    const { userId, fullName, email, avatarUrl } = user;

    const classes = {
        base: 'hover:border-buttonPrimary flex w-full flex-col rounded-xl border border-transparent max-w-[300px]',
        selected:
            'hover:border-buttonPrimary flex w-full flex-col rounded-xl border  border-buttonPrimary max-w-[300px]',
        followed:
            'text-action hover:border-buttonSecondary hover:text-buttonSecondary inline-flex items-center justify-center rounded-full border sm:h-7 sm:w-7 lg:h-10 lg:w-10',
        notFollowed:
            'text-lm-grey-200 inline-flex items-center justify-center rounded-full border sm:h-7 sm:w-7 lg:h-10 lg:w-10',
    };

    const handleOnToggleFollow = useCallback(() => {
        if (isCardSelected) {
            selectCard(null);
        }
        onToggleFollow(userId, !isFollowed);
    }, [onToggleFollow, userId, isCardSelected, selectCard, isFollowed]);

    const handleSelectCard = useCallback((): void => {
        selectCard(user);
    }, [selectCard, user]);

    const handleSendMessage = useCallback(() => {
        const membersId = new Set([authorizedUser.id, userId]);

        const chatPayload = {
            membersId: [userId],
            isAssistant: false,
        };

        const existingChat = chats.find(({ users }) =>
            users.map(({ id }) => id).every((id) => membersId.has(id)),
        );

        if (existingChat) {
            const redirectPath = configureString(AppRoute.CHATS_$ID, {
                id: String(existingChat?.id),
            });

            return void navigate(redirectPath);
        }

        void dispatch(chatActionCreator.createChat(chatPayload));

        void navigate(AppRoute.CHATS);
    }, [authorizedUser, chats, dispatch, navigate, userId]);

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
                        className="aspect-square w-full rounded-t-xl object-cover"
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
                        className={`${isActive ? 'bg-buttonPrimary' : 'bg-buttonTertiary'} h-2 w-full max-w-2 rounded-[50%]`}
                    />

                    <h3 className="text-primary truncate font-extrabold sm:text-xs lg:text-[1rem]">
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
                        onClick={handleSendMessage}
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
