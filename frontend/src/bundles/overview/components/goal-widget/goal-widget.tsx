import { Icon } from '~/bundles/common/components/components.js';

import { CircularProgress } from './components/components.js';

type WidgetProperties = {
    title: string;
    subTitle?: string;
    value: number;
    target: number;
};

const GoalWidget = ({
    title = 'Track Your Daily Activities',
    subTitle = '',
    value = 6,
    target = 10,
}: WidgetProperties): JSX.Element => {
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
                <div className="flex w-1/4 text-white">
                    <Icon name="logoIcon" size="md"></Icon>
                    <p className="text-md font-extrabold">Exercises</p>
                </div>
                <div className="flex w-2/4 items-center justify-center">
                    <CircularProgress value={value} target={target} />
                    <div className="absolute text-white">
                        <p className="font-gilroy inline-flex text-4xl font-extrabold">
                            {value}
                        </p>
                        <p className="inline-flex font-normal">/{target}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { GoalWidget };
