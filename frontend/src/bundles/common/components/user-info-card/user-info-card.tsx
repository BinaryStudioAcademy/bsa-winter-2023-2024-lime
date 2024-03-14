import { ChevronRightIcon } from '@heroicons/react/16/solid';

import { type AchievementsGetAllResponseDto } from '~/bundles/achievements/types/types.js';
import {
    AchievementCard,
    Button,
    ButtonVariant,
} from '~/bundles/common/components/components.js';
import { AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    name: string;
    image: string;
    isActive?: boolean;
    achievements?: AchievementsGetAllResponseDto[];
};

const UserInfoCard: React.FC<Properties> = ({
    name,
    image,
    isActive = true,
    achievements = [],
}) => {
    const navigate = useNavigate();

    const handleViewAllClick = useCallback((): void => {
        void navigate(AppRoute.GOALS);
    }, [navigate]);

    return (
        <div className="bg-primary flex h-screen w-[22.375rem] flex-col gap-11 p-5">
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-1.5">
                    {isActive && (
                        <span className="bg-lm-yellow-100 h-2 w-2 rounded-full"></span>
                    )}
                    <p className="text-primary text-base font-semibold">
                        {name}
                    </p>
                </div>
                <img
                    src={image}
                    alt={name}
                    className="h-44 w-44 overflow-hidden rounded-full object-cover"
                />
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
