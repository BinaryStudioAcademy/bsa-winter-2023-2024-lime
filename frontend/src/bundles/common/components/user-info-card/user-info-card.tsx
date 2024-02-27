import { ChevronRightIcon } from '@heroicons/react/16/solid';

import { ComponentSize } from '../../enums/component-size.enum.js';
import { AchievementCard, Button, ButtonVariant } from '../components.js';

type Properties = {
    name: string;
    image: string;
    isActive: boolean;
    onClick: () => void;
    achievements?: [];
};

const UserInfoCard: React.FC<Properties> = ({
    name,
    image,
    isActive = false,
    achievements = [],
    onClick,
}) => {
    return (
        <div className="bg-primary pt- flex h-screen w-[22.375rem] flex-col gap-11 p-5">
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
                <h2 className="text-md font-extrabold">Achievements</h2>
                {achievements.map(({ id, activity, createdAt, name }) => (
                    <AchievementCard
                        key={id}
                        activity={activity}
                        date={createdAt}
                        achievement={name}
                    />
                ))}
                <div className="absolute right-0 top-0 w-20">
                    <Button
                        className="px-0 py-0"
                        label="View All"
                        type="button"
                        size={ComponentSize.SMALL}
                        variant={ButtonVariant.TERTIARY}
                        rightIcon={<ChevronRightIcon width="24" />}
                        onClick={onClick}
                    />
                </div>
            </div>
        </div>
    );
};

export { UserInfoCard };
