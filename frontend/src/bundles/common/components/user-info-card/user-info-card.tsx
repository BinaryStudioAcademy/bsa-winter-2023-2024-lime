import { ChevronRightIcon } from '@heroicons/react/16/solid';

import { actions as achievementsActions } from '~/bundles/achievements/store/achievements.js';
import {
    AchievementCard,
    Avatar,
    Button,
    ButtonVariant,
    Loader,
} from '~/bundles/common/components/components.js';
import {
    AppRoute,
    ComponentSize,
    DataStatus,
} from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';

import { configureString, getValidClassNames } from '../../helpers/helpers.js';

type Properties = {
    userId: number | null;
    name: string;
    image: string;
    className?: string;
};

const UserInfoCard: React.FC<Properties> = ({
    userId,
    name,
    image,
    className = '',
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { achievements, dataStatus } = useAppSelector(
        ({ achievements }) => achievements,
    );

    const isLoading = dataStatus === DataStatus.PENDING;

    const handleViewAllClick = useCallback((): void => {
        if (userId) {
            void navigate(
                configureString(AppRoute.PROFILE_PUBLIC_$ID, {
                    id: String(userId),
                }),
            );
        }
    }, [navigate, userId]);

    useEffect(() => {
        if (userId) {
            void dispatch(achievementsActions.getAchievementsByUserId(userId));
        }
    }, [userId, dispatch]);

    return (
        <div
            className={getValidClassNames(
                'bg-primary flex h-screen w-[22.375rem] flex-col gap-11 p-5',
                className,
            )}
        >
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-1.5">
                    <p className="text-primary text-base font-semibold">
                        {name}
                    </p>
                </div>
                <Avatar size="xxl" email={name} avatarUrl={image} />
            </div>
            <div className="relative flex flex-col gap-4 px-0">
                <div className="flex flex-row items-center justify-between px-4">
                    <h2 className="text-secondary text-xl font-extrabold">
                        Achievements
                    </h2>
                    <div className="right-0 top-0 w-24">
                        <Button
                            className="!p-0"
                            label="More info"
                            type="button"
                            size={ComponentSize.SMALL}
                            variant={ButtonVariant.TERTIARY}
                            rightIcon={<ChevronRightIcon width="18" />}
                            onClick={handleViewAllClick}
                        />
                    </div>
                </div>
                {isLoading ? (
                    <div>
                        <Loader isOverflow />
                    </div>
                ) : (
                    achievements.map((achievement, index) => {
                        if (index > 3) {
                            return;
                        }
                        return (
                            <AchievementCard
                                key={achievement.id}
                                achievement={achievement}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export { UserInfoCard };
