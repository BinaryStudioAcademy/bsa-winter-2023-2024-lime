import { ActivityIcon } from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

import styles from './styles.module.css';

type Properties = {
    weekDay: string;
    activityType: ValueOf<typeof ActivityType>;
    date: string;
    className?: string;
};
const ScheduleCard: React.FC<Properties> = ({
    weekDay,
    activityType,
    date,
    className,
}) => {
    return (
        <li className={`${styles['schedule__item']} ${className ?? ''}`}>
            <div className="schedule-card bg-primary w-full rounded-lg p-4">
                <div className="text-md text-card mb-4 font-semibold leading-3">
                    {weekDay}
                </div>

                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center justify-start">
                        <div className="mr-2">
                            <ActivityIcon
                                activityType={activityType}
                                size={ComponentSize.MEDIUM}
                            />
                        </div>
                        <div>
                            <div className="text-lm-grey-200 leading-1 mb-2 text-sm font-bold">
                                {activityType}
                            </div>
                            <div className="leading-1 text-lm-grey-300 text-xs font-normal">
                                At {date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export { ScheduleCard };
