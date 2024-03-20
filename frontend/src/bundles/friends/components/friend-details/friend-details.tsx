import { XMarkIcon } from '@heroicons/react/16/solid';
import { ChevronRightIcon, UserCircleIcon } from '@heroicons/react/24/solid';

import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import { Avatar, Card } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    formatDateString,
    getValidClassNames,
    validateImageUrl,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { type FriendResponseDto } from '~/bundles/friends/types/types.js';

type Properties = {
    id: number;
    name: string | null;
    isActive: boolean;
    avatarUrl: string | null;
    setSelectedCard: (card: FriendResponseDto | null) => void;
};

const FriendDetails = ({
    id,
    name,
    isActive,
    avatarUrl,
    setSelectedCard,
}: Properties): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { achievements } = useAppSelector(({ achievements }) => achievements);

    const classes = {
        base: 'bg-buttonTertiary h-2 w-2 rounded-[50%]',
        active: 'bg-buttonPrimary h-2 w-2 rounded-[50%]',
        closeIcon:
            'stroke-lm-grey-200 fill-lm-grey-200 hover:stroke-lm-yellow-100 hover:fill-lm-yellow-100 absolute left-3 top-3 h-4 w-4 cursor-pointer transition-all ',
        noAvatar:
            'bg-lm-grey-100 h-176 w-176 flex aspect-square items-center justify-center rounded-[50%]',
    };

    const handleMoreInfoClick = useCallback((): void => {
        void navigate(`${AppRoute.PROFILE_PUBLIC}/${id}`);
    }, [navigate, id]);

    const handleSetSelectedCard = useCallback((): void => {
        void setSelectedCard(null);
    }, [setSelectedCard]);

    useEffect(() => {
        void dispatch(achievementsActions.getAchievementsByUserId(id));
    }, [dispatch, id]);

    return (
        <div className={'flex flex-col items-center justify-center '}>
            <XMarkIcon
                onClick={handleSetSelectedCard}
                className={getValidClassNames(classes.closeIcon)}
            />

            <div className="mb-4 flex items-center gap-2">
                <div
                    className={getValidClassNames(
                        isActive ? classes.active : classes.base,
                    )}
                />

                <h3 className="text-primary font-heading font-semibold sm:text-xs lg:text-[1rem]">
                    {name}
                </h3>
            </div>

            <div className={'mb-44'}>
                {avatarUrl && validateImageUrl(avatarUrl) ? (
                    <Avatar
                        size="xxl"
                        email={name ?? ''}
                        avatarUrl={avatarUrl}
                    />
                ) : (
                    <div className={getValidClassNames(classes.noAvatar)}>
                        <UserCircleIcon className="text-lm-grey-200 h-full w-full" />
                    </div>
                )}
            </div>

            <div className="mb-4 flex w-full items-center justify-between">
                {achievements?.length > 0 && (
                    <h3 className="text-lm-grey-200 text-xl font-extrabold leading-6">
                        Achievements
                    </h3>
                )}

                <div
                    onClick={handleMoreInfoClick}
                    role="presentation"
                    className="flex cursor-pointer items-center gap-1"
                >
                    <span className="text-action text-sm font-semibold leading-4">
                        More info
                    </span>
                    <ChevronRightIcon className="text-action h-3 w-3" />
                </div>
            </div>

            {achievements?.length > 0 && (
                <div className={'flex w-full flex-col gap-4'}>
                    {achievements.map((achievement) => (
                        <Card
                            key={achievement.id}
                            name={achievement.name}
                            data={formatDateString(achievement.createdAt)}
                            chip={
                                achievement.requirement +
                                achievement.requirementMetric
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export { FriendDetails };
