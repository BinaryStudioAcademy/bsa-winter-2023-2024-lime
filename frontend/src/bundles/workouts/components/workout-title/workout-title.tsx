import { ActivityIcon } from '~/bundles/common/components/activity-icon/activity-icon.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

type Properties = {
    workout: WorkoutResponseDto;
};

const WorkoutTitle = ({ workout }: Properties): JSX.Element => {
    const { activityType } = workout;

    const baseClass = '!p-3 !bg-lm-grey-500';

    return (
        <div className="flex items-center gap-[0.7rem]">
            <ActivityIcon
                activityType={activityType}
                size={ComponentSize.LARGE}
                className={baseClass}
            />
            <h1 className="flex flex-col">
                <span className="text-lm-grey-200 text-xs">Details of</span>
                <span className="text-primary text-xl font-extrabold">
                    {capitalizeFirstLetter(activityType)} activity
                </span>
            </h1>
        </div>
    );
};

export { WorkoutTitle };
