import { Icon } from '~/bundles/common/components/components.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { CircularProgress } from './components/components.js';
import { GoalTypes } from './enums/goal-types.enums.js';

type WidgetProperties = {
    goalType?: ValueOf<typeof GoalTypes>;
    title: string;
    subTitle?: string;
    value: number;
    target: number;
};

const GoalWidget = ({
    goalType = GoalTypes.GENERAL,
    title = 'Track Your Daily Activities',
    subTitle = '',
    value,
    target,
}: WidgetProperties): JSX.Element => {
    const rightTitle =
        goalType === GoalTypes.GENERAL ? 'Exercises' : 'Running on Track';

    return (
        <div className="bg-goalWidget flex max-w-[50rem] items-center rounded-xl">
            <div className="w-4/6 bg-gray-200 p-4">
                <p className="font-bolder text-lm-black-100 text-[24px]">
                    {title}
                </p>
                {subTitle && (
                    <p className="text-lm-black-100 text-[14px]">{subTitle}</p>
                )}
            </div>
            <div className="flex w-3/6 items-center justify-end">
                <div className="flex w-2/4 text-white">
                    {goalType === GoalTypes.GENERAL ?? (
                        <Icon name="logoIcon" size="md"></Icon>
                    )}
                    <p className="text-md font-extrabold">{rightTitle}</p>
                </div>
                <div className="flex w-2/4 items-center justify-center">
                    <CircularProgress value={value} target={target} />
                    <div className="absolute text-white">
                        {goalType === GoalTypes.GENERAL && (
                            <>
                                <p className="inline-flex text-4xl font-extrabold">
                                    {value}
                                </p>
                                <p className="inline-flex font-normal">
                                    /{target}
                                </p>
                            </>
                        )}
                        {goalType === GoalTypes.RUNNING ||
                            (goalType === GoalTypes.WALKING && (
                                <>
                                    <p className="inline-flex text-4xl font-extrabold">
                                        {value}
                                    </p>
                                    <p className="inline-flex font-normal">
                                        km
                                    </p>
                                </>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { GoalWidget };
