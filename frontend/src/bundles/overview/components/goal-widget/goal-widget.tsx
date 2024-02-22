import { Icon } from '~/bundles/common/components/components.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { CircleProgress } from '../components.js';
import { GoalTypes } from './enums/goal-types.enums.js';

type WidgetProperties = {
    value: number;
    target: number;
    goalType?: ValueOf<typeof GoalTypes>;
    title?: string;
    subTitle?: string;
};

const GoalWidget = ({
    value,
    target,
    goalType = GoalTypes.OVERVIEW,
    title = 'Track Your Daily Activities',
    subTitle = '',
}: WidgetProperties): JSX.Element => {
    const rightTitle =
        goalType === GoalTypes.OVERVIEW ? 'Exercises' : 'Running on Track';

    return (
        <div className="bg-lm-black-100 bg-goalWidget flex h-full max-h-40 w-full max-w-[50rem] items-center rounded-xl">
            <div className="w-4/6 bg-gray-200 p-6">
                <p className="font-bolder text-lm-black-100 line text-[24px] leading-7">
                    {title}
                </p>
                {subTitle && (
                    <p className="text-lm-black-100 text-[14px]">{subTitle}</p>
                )}
            </div>
            <div className="flex w-3/6 items-center justify-end p-4">
                <div className="flex w-2/4 justify-end text-white">
                    {goalType === GoalTypes.OVERVIEW && (
                        <Icon name="workoutIcon" size="lg" />
                    )}
                    <p className="text-md font-extrabold">{rightTitle}</p>
                </div>
                <div className="flex w-2/4 items-center justify-center">
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
