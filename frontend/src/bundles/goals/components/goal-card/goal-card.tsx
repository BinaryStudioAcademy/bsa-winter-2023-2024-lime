import { ActivityIcon } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';
import { CircleProgress } from '~/bundles/overview/components/components.js';

import { type FrequencyType } from '../../enums/enums.js';

type Properties = {
    activityType: ValueOf<typeof ActivityType>;
    frequency: number;
    progress: number;
    frequencyType: ValueOf<typeof FrequencyType>;
};

const PLURAL = 's';
const MAXIMUM_PROGRESS = 100;

const GoalCard: React.FC<Properties> = ({
    activityType,
    frequency,
    progress,
    frequencyType,
}): JSX.Element => {
    return (
        <div className="bg-primary flex h-[7.5rem] w-full items-center justify-between rounded-xl p-3 pl-5 lg:w-[48.5%] lg:p-5 lg:pl-8">
            <div className="flex items-center gap-4">
                <ActivityIcon
                    activityType={activityType}
                    size={ComponentSize.MEDIUM}
                />
                <div className="flex flex-col">
                    <p className="text-primary text-sm font-extrabold leading-5 md:text-base">
                        {capitalizeFirstLetter(activityType)}
                    </p>
                    <p className="text-lm-grey-200 text-xs font-normal leading-3">
                        {frequency} {frequencyType}
                        {frequency > 1 && PLURAL}
                    </p>
                </div>
            </div>
            <div>
                <CircleProgress
                    value={progress}
                    target={MAXIMUM_PROGRESS}
                    size={ComponentSize.SMALL}
                />
            </div>
        </div>
    );
};

export { GoalCard };
