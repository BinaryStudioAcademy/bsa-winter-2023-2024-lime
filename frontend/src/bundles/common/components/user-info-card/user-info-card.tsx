import { ChevronRightIcon } from '@heroicons/react/16/solid';

import { type AchievementsGetAllResponseDto } from '~/bundles/achievements/types/types.js';
import {
    AchievementCard,
    Avatar,
    Button,
    ButtonVariant,
} from '~/bundles/common/components/components.js';
import { AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';

import { configureString, getValidClassNames } from '../../helpers/helpers.js';

type Properties = {
    userId: string;
    name: string;
    image: string;
    achievements?: AchievementsGetAllResponseDto[];
    className?: string;
};

const UserInfoCard: React.FC<Properties> = ({
    userId,
    name,
    image,
    achievements = [],
    className = '',
}) => {
    const navigate = useNavigate();

    const handleViewAllClick = useCallback((): void => {
        void navigate(
            configureString(AppRoute.PROFILE_PUBLIC_$ID, {
                id: userId,
            }),
        );
    }, [navigate, userId]);

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
            <div className="relative flex flex-col gap-4">
                <h2 className="text-secondary text-xl font-extrabold">
                    Achievements
                </h2>
                {achievements.map((achievement) => (
                    <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                    />
                ))}
                <div className="absolute right-0 top-0 w-20">
                    <Button
                        className="!p-0"
                        label="View All"
                        type="button"
                        size={ComponentSize.SMALL}
                        variant={ButtonVariant.TERTIARY}
                        rightIcon={<ChevronRightIcon width="18" />}
                        onClick={handleViewAllClick}
                    />
                </div>
            </div>
        </div>
    );
};

export { UserInfoCard };
