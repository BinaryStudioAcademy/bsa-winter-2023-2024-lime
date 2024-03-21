import { TrashIcon } from '@heroicons/react/16/solid';

import { ActivityIcon } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import {
    capitalizeFirstLetter,
    convertMetersToKilometers,
} from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';
import { CircleProgress } from '~/bundles/overview/components/components.js';

import { FrequencyType } from '../../enums/enums.js';

type Properties = {
    id: number;
    activityType: ValueOf<typeof ActivityType>;
    frequency: number;
    progress: number;
    frequencyType: ValueOf<typeof FrequencyType>;
    distance?: number | null;
    duration?: number | null;
    onDelete: (id: number) => void;
};

const PLURAL = 's';
const DAY_PREPOSITION = 'a';
const WEEK_PREPOSITION = 'per';
const MAXIMUM_PROGRESS = 100;
const DISTANCE_DIMENSION = 'km';
const TIME_DIMENSION = 'min';

const GoalCard: React.FC<Properties> = ({
    id,
    activityType,
    frequency,
    progress,
    frequencyType,
    distance = null,
    duration = null,
    onDelete,
}): JSX.Element => {
    const handleDelete = useCallback(() => {
        onDelete(id);
    }, [id, onDelete]);

    return (
        <div className="bg-primary relative flex h-[7.5rem] w-full items-center justify-between rounded-xl p-3 pl-5 lg:w-[48.5%] lg:p-5 lg:pl-8">
            <div className="flex items-center gap-4">
                <ActivityIcon
                    activityType={activityType}
                    size={ComponentSize.MEDIUM}
                />
                <div className="flex flex-col">
                    <p className="text-primary text-sm font-extrabold leading-5 md:text-base">
                        {capitalizeFirstLetter(activityType)}{' '}
                        {distance
                            ? `${convertMetersToKilometers(distance)} ${DISTANCE_DIMENSION}`
                            : `${duration} ${TIME_DIMENSION}`}{' '}
                        {distance && duration
                            ? `for ${duration} ${TIME_DIMENSION}`
                            : ''}
                    </p>
                    <p className="text-lm-grey-200 text-xs font-normal leading-3">
                        {frequency} time{frequency > 1 && PLURAL}{' '}
                        {frequencyType === FrequencyType.DAY
                            ? DAY_PREPOSITION
                            : WEEK_PREPOSITION}{' '}
                        {frequencyType}
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
            <TrashIcon
                className="hover:text-action text-lm-grey-200 absolute right-0 top-0 m-2 w-4 cursor-pointer transition duration-300"
                onClick={handleDelete}
            />
        </div>
    );
};

export { GoalCard };
