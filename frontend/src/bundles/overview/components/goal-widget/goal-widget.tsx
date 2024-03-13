import { Icon } from '~/bundles/common/components/components.js';
import {
    capitalizeFirstLetter,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { CircleProgress } from '../components.js';
import { GoalTypes } from './enums/goal-types.enums.js';

type WidgetProperties = {
    value: number;
    target: number;
    goalType?: ValueOf<typeof GoalTypes>;
    title?: string;
    subTitle?: string;
    className?: string;
    hasAchievement?: boolean;
    hasDistance?: boolean;
};

const GoalWidget = ({
    value,
    target,
    goalType = GoalTypes.OVERVIEW,
    title = 'Track Your Daily Activities',
    subTitle = '',
    hasAchievement = true,
    className = '',
    hasDistance = false,
}: WidgetProperties): JSX.Element => {
    const rightTitle =
        goalType === GoalTypes.OVERVIEW
            ? 'Exercises'
            : capitalizeFirstLetter(goalType);

    return (
        <div
            className={getValidClassNames(
                'bg-goalWidget flex h-40 w-full items-center justify-between rounded-xl px-6',
                className,
            )}
        >
            <div>
                <p className="font-heavybold text-lm-black-200 hidden text-[1.5rem] leading-7 md:block">
                    {title}
                </p>
                {subTitle && (
                    <p className="text-lm-black-200 hidden text-sm md:block">
                        {subTitle}
                    </p>
                )}
            </div>
            {hasAchievement && (
                <div className="flex items-center gap-3.5">
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
