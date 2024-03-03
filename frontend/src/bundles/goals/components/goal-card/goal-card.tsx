import { ActivityIcon } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { capitalizeString } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { CircularColors } from '~/bundles/overview/components/circle-progress/enums/circle-progress-color.enums.js';
import { CircleProgress } from '~/bundles/overview/components/components.js';

import { type FrequencyType } from '../../enums/enums.js';

type Properties = {
    activity: string;
    frequency: number;
    progress: number;
    frequencyType: ValueOf<typeof FrequencyType>;
};

const PLURAL = 's';

const GoalCard: React.FC<Properties> = ({
    activity,
    frequency,
    progress,
    frequencyType,
}): JSX.Element => {
    return (
        <div className="bg-secondary flex h-[7.5rem] items-center justify-between rounded-xl p-3 pl-5 md:w-full lg:p-5 lg:pl-8 xl:w-96">
            <div className="flex items-center gap-4">
                <ActivityIcon activity={activity} size={ComponentSize.MEDIUM} />
                <div className="flex flex-col">
                    <p className="text-primary text-sm font-extrabold leading-5 md:text-base">
                        {capitalizeString(activity)}
                    </p>
                    <p className="text-lm-grey-200 text-xs font-normal leading-3">
                        {frequency}{' '}
                        {frequency === 1
                            ? frequencyType
                            : frequencyType + PLURAL}
                    </p>
                </div>
            </div>
            <div>
                <CircleProgress
                    value={progress}
                    target={100}
                    size={ComponentSize.SMALL}
                    color={CircularColors.primary}
                />
            </div>
        </div>
    );
};

export { GoalCard };
