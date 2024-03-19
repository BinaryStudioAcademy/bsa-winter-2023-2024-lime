import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

import { ActivityIcon } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

type Properties = {
    weekDay: string;
    activityType: ValueOf<typeof ActivityType>;
    date: string;
    isExpanded: boolean;
    id: number;
    className?: string;
    onUpdate?: (id: number) => void;
    onDelete?: (id: number) => void;
};
const ScheduleCard: React.FC<Properties> = ({
    weekDay,
    activityType,
    date,
    className = '',
    isExpanded,
    onUpdate,
    onDelete,
    id,
}) => {
    const activity = capitalizeFirstLetter(activityType) as ValueOf<
        typeof ActivityType
    >;

    const handleUpdate = useCallback(() => {
        onUpdate ? onUpdate(id) : null;
    }, [onUpdate]);

    const handleDelete = useCallback(() => {
        onDelete ? onDelete(id) : null;
    }, [onDelete]);

    return (
        <li className={className}>
            <div className="schedule-card bg-primary w-full rounded-lg p-4">
                <div className="text-md text-card mb-4 font-semibold leading-3">
                    {weekDay}
                </div>

                <div className="flex w-full items-center justify-between">
                    <div className="flex w-full items-center">
                        <div className="mr-2">
                            <ActivityIcon
                                activityType={activityType}
                                size={ComponentSize.MEDIUM}
                            />
                        </div>
                        <div>
                            <div className="text-lm-grey-200 leading-1 mb-2 text-sm font-bold">
                                {activity}
                            </div>
                            <div className="leading-1 text-lm-grey-300 text-xs font-normal">
                                At {date}
                            </div>
                        </div>
                    </div>
                    {isExpanded && (
                        <div className="text-lm-grey-200 flex cursor-pointer gap-3 ">
                            <PencilIcon
                                onClick={handleUpdate}
                                className="hover:text-lm-yellow-100 w-6 transition duration-300"
                            />
                            <TrashIcon
                                onClick={handleDelete}
                                className="hover:text-lm-yellow-100 w-6 transition duration-300"
                            />
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};

export { ScheduleCard };
