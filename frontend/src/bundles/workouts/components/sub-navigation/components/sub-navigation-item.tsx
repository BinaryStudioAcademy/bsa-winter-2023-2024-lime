import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { type WorkoutResponseDto } from 'shared';

import { ActivityIcon } from '~/bundles/common/components/components.js';
import { AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    configureString,
} from '~/bundles/common/helpers/helpers.js';

type SubNavigationItemWorkoutProperties = {
    item: WorkoutResponseDto;
};

const SubNavigationItemWorkout = ({
    item,
}: SubNavigationItemWorkoutProperties): JSX.Element => {
    const { activityType, id, workoutStartedAt } = item;
    const isActive =
        id.toString() === window.location.pathname.split('/').pop();

    const reference = useRef(null as unknown as HTMLLIElement);

    const redirectPath = configureString(AppRoute.WORKOUT_$ID, {
        id: String(id),
    });

    useEffect(() => {
        if (isActive && reference.current) {
            reference.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [isActive]);
    return (
        <li ref={reference}>
            <Link
                to={redirectPath}
                className="flex w-5/6 min-w-60 max-w-72 items-center justify-between gap-4"
            >
                <div className="flex w-full items-center gap-4">
                    <ActivityIcon
                        activityType={activityType}
                        size={ComponentSize.LARGE}
                        className={` ${isActive ? '' : '!bg-lm-grey-500'} !p-3`}
                    />
                    <div className="flex flex-grow flex-col items-start">
                        <div className="flex w-full items-center justify-between">
                            <h3 className="text-primary">
                                {capitalizeFirstLetter(activityType)}
                            </h3>
                            <p className="text-secondary text-right text-[0.7rem] md:text-[0.6rem]">
                                {workoutStartedAt.toISOString().split('T')[0]}
                            </p>
                        </div>
                        <p className="text-secondary flex justify-between text-[0.8rem]">
                            <span>{capitalizeFirstLetter('strava')}</span>
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export { SubNavigationItemWorkout };
