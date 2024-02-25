import { ActivityIcon } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { capitalizeString } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { CircleProgress } from '~/bundles/goals/components/components.js';

import { type FrequencyType } from '../../enums/enums.js';

type Properties = {
    activity: string;
    frequency: number;
    progress: number;
    frequencyType: ValueOf<typeof FrequencyType>;
};
const GoalCard: React.FC<Properties> = ({
    activity,
    frequency,
    progress,
    frequencyType,
}): JSX.Element => {
    return (
        <div className="bg-lm-black-100 flex h-[5rem] items-center justify-between rounded-xl p-3 pl-5 md:h-[7.5rem] md:w-72 lg:p-5 lg:pl-8 xl:w-96">
            <div className="flex items-center gap-4">
                <ActivityIcon activity={activity} size={ComponentSize.MEDIUM} />
                <div className="flex flex-col">
                    <p className="text-sm font-extrabold leading-5 text-white md:text-base">
                        {capitalizeString(activity)}
                    </p>
                    <p className="text-lm-grey-200 text-xs font-normal leading-3">
                        {frequency}{' '}
                        {frequency === 1 ? frequencyType : frequencyType + 's'}
                    </p>
                </div>
            </div>
            <div className="h-16 w-16 md:h-20 md:w-20">
                <CircleProgress progress={progress} />
            </div>
        </div>
    );
};

export { GoalCard };
