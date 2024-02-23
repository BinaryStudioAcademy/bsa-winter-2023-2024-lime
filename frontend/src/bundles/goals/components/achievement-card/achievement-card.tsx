import { ActivityIcon } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

type Properties = {
    activity: string;
    date: string;
    distance?: number;
    duration?: number;
};

const AchievementCard: React.FC<Properties> = ({
    activity,
    date,
    distance,
    duration,
}): JSX.Element => {
    return (
        <div className="bg-lm-black-100 flex h-[4.125rem] w-80 justify-between rounded-lg p-4 pl-6">
            <div className="flex gap-6">
                <ActivityIcon activity={activity} size={ComponentSize.SMALL} />
                <div>
                    <p className="text-lm-grey-200 mb-2 text-sm font-bold  leading-3">
                        {activity}
                    </p>
                    <p className="text-lm-grey-300 text-xs font-normal leading-3">
                        {date}
                    </p>
                </div>
            </div>
            <div className="bg-lm-grey-500 flex items-center justify-center rounded-full px-2 py-1">
                <span className="text-lm-yellow-100 text-xs font-semibold">
                    {distance ?? duration}
                </span>
            </div>
        </div>
    );
};

export { AchievementCard };
