import { dateConverter } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    activity?: string;
    date: string;
    achievement: string;
};

const AchievementCard: React.FC<Properties> = ({
    date,
    achievement,
}): JSX.Element => {
    return (
        <div className="bg-lm-black-100 flex h-[4.125rem] items-center justify-between rounded-lg p-4 lg:w-80">
            <div className="flex gap-2">
                <div>
                    <p className="text-lm-grey-200 mb-2 text-sm font-bold  leading-3">
                        {achievement}
                    </p>
                    <p className="text-lm-grey-300 text-[0.5rem] font-normal leading-3 md:text-xs">
                        {dateConverter(date)}
                    </p>
                </div>
            </div>
            <div className="bg-lm-grey-500 hidden items-center justify-center rounded-full px-2 py-1 xl:block">
                <span className="text-lm-yellow-100 text-xs font-semibold">
                    {achievement}
                </span>
            </div>
        </div>
    );
};

export { AchievementCard };
