import { Icon } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
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
};

const GoalWidget = ({
    value,
    target,
    goalType = GoalTypes.OVERVIEW,
    title = 'Track Your Daily Activities',
    subTitle = '',
    className = '',
}: WidgetProperties): JSX.Element => {
    const rightTitle =
        goalType === GoalTypes.OVERVIEW ? 'Exercises' : 'Running on Track';

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
                    <p className="text-lm-black-200 text-sm">{subTitle}</p>
                )}
            </div>
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
                    />
                </div>
            </div>
        </div>
    );
};

export { GoalWidget };
