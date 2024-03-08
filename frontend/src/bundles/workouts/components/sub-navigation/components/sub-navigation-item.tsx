import { Link } from 'react-router-dom';
import { type WorkoutResponseDto } from 'shared';

import { ActivityIcon } from '~/bundles/common/components/activity-icon/activity-icon.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';

type SubNavigationItemWorkoutProperties = {
    item: WorkoutResponseDto;
};

const SubNavigationItemWorkout = ({
    item,
}: SubNavigationItemWorkoutProperties): JSX.Element => {
    const {
        activityType,
        id,
        workoutStartedAt,
        duration,
        kilocalories,
        distance,
    } = item;
    const isActive =
        id.toString() === window.location.pathname.split('/').pop();
    return (
        <li>
            <Link
                to={`/workout/${id}`}
                className="flex w-full max-w-72 items-center justify-between gap-4"
            >
                <div className="flex w-full items-center gap-4">
                    <ActivityIcon
                        activity={activityType}
                        size={ComponentSize.LARGE}
                        className={` ${isActive ? '' : '!bg-lm-grey-500'} !p-3`}
                    />
                    <div className="flex-grow">
                        <div className="flex justify-between">
                            <h3 className="text-primary">
                                {capitalizeFirstLetter(activityType)}
                            </h3>
                            <p className="text-secondary text-[0.7rem]">
                                {workoutStartedAt.toDateString()}
                            </p>
                        </div>
                        <p className="text-primary flex justify-around">
                            <span>{duration} min</span>
                            <span>{distance} km</span>
                            <span>{kilocalories} kcal</span>
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export { SubNavigationItemWorkout };
