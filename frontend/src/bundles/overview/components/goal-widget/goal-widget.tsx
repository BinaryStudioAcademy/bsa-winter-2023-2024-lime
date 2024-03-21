import { Icon } from '~/bundles/common/components/components.js';
import {
    capitalizeFirstLetter,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { CircleProgress } from '../components.js';
import { GoalTypes } from './enums/goal-types.enums.js';

type Properties = {
    value: number;
    target: number;
    goalType?: ValueOf<typeof GoalTypes>;
    title?: string;
    subTitle?: string;
    rightTitle?: string;
    className?: string;
    hasAchievement?: boolean;
    hasDistance?: boolean;
};

const GoalWidget: React.FC<Properties> = ({
    value,
    target,
    goalType = GoalTypes.OVERVIEW,
    title = 'Track Your Daily Activities',
    subTitle = '',
    hasAchievement = true,
    className = '',
    rightTitle,
    hasDistance = false,
}): JSX.Element => {
    if (!rightTitle) {
        rightTitle =
            goalType === GoalTypes.OVERVIEW
                ? 'Exercises'
                : capitalizeFirstLetter(goalType);
    }

    return (
        <div
            className={getValidClassNames(
                'bg-goalWidget flex w-full items-center justify-center rounded-xl px-6 py-2 sm:h-40 sm:justify-between sm:py-0',
                className,
            )}
        >
            <div>
                <p
                    className={getValidClassNames(
                        'font-heavybold text-lm-black-200 text-xl leading-7 md:text-[1.5rem]',
                        hasAchievement ? 'hidden md:block' : '',
                    )}
                >
                    {title}
                </p>
                {subTitle && (
                    <p className="text-lm-black-200 hidden text-sm md:block">
                        {subTitle}
                    </p>
                )}
            </div>
            {hasAchievement && (
                <div className="flex flex-col-reverse items-center gap-3.5 sm:flex-row">
                    <div className="flex items-center gap-2 text-white">
                        {goalType === GoalTypes.OVERVIEW && (
                            <Icon name="workoutIcon" size="lg" />
                        )}
                        <p className="text-base font-extrabold">{rightTitle}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <CircleProgress
                            value={value}
                            target={target}
                            goalType={goalType}
                            hasDistance={hasDistance}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export { GoalWidget };
