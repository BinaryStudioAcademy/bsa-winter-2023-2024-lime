import { ActivityIcon } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

type Properties = {
    activity: string;
    frequency: number;
    progress: number;
};
const GoalCard: React.FC<Properties> = ({
    activity,
    frequency,
}): JSX.Element => {
    return (
        <div className="bg-lm-black-100 flex h-[7.5rem] w-96 justify-between rounded-xl p-5 pl-8">
            <div className="flex items-center gap-4">
                <ActivityIcon activity={activity} size={ComponentSize.LARGE} />
                <div className="flex flex-col">
                    <p className="text-base font-extrabold leading-5 text-white">
                        {activity}
                    </p>
                    <p className="text-lm-grey-200 text-xs font-normal leading-3">
                        {frequency}
                    </p>
                </div>
            </div>
            <div className="bg-lm-yellow-100 h-[68px] w-[68px] rounded-full"></div>
        </div>
    );
};

export { GoalCard };
