import { type AchievementsGetAllResponseDto } from '~/bundles/achievements/types/types.js';
import { formatDateString } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    achievement: AchievementsGetAllResponseDto;
};

const AchievementCard: React.FC<Properties> = ({
    achievement,
}): JSX.Element => {
    return (
        <div className="bg-primary flex min-h-[4.125rem] w-full items-center justify-between rounded-lg p-4 xl:w-80">
            <div className="flex items-center gap-2">
                <div>
                    <p className="text-lm-grey-200 mb-2 max-w-[12rem] text-sm font-bold leading-3 md:max-w-none lg:max-w-[12rem]">
                        {achievement.name}
                    </p>
                    <p className="text-lm-grey-300 text-xs font-normal leading-3">
                        {formatDateString(achievement.createdAt)}
                    </p>
                </div>
            </div>
            <div className="bg-tertiary items-center justify-center rounded-full px-2 py-1">
                <span className="text-action flex items-center justify-center text-center text-xs font-semibold">
                    {achievement.requirement} {achievement.requirementMetric}
                </span>
            </div>
        </div>
    );
};

export { AchievementCard };
