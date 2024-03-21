import { Link } from 'react-router-dom';

import { ActivityIcon } from '~/bundles/common/components/components.js';
import { AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    configureString,
} from '~/bundles/common/helpers/helpers.js';
import { useParams } from '~/bundles/common/hooks/hooks.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

type Properties = {
    item: WorkoutResponseDto;
};

const SubNavigationItemWorkout = ({ item }: Properties): JSX.Element => {
    const { activityType, id, workoutStartedAt, provider } = item;
    const parameters = useParams();
    const isActive = parameters['id'] === id.toString();

    const redirectPath = configureString(AppRoute.WORKOUT_$ID, {
        id: String(id),
    });

    return (
        <li className="flex items-center justify-center">
            <Link
                to={redirectPath}
                className="flex w-5/6 min-w-60 max-w-full items-center justify-between gap-4"
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
                                {
                                    new Date(workoutStartedAt)
                                        .toISOString()
                                        .split('T')[0]
                                }
                            </p>
                        </div>
                        {provider && (
                            <p className="text-secondary flex justify-between text-[0.8rem]">
                                <span>{capitalizeFirstLetter(provider)}</span>
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </li>
    );
};

export { SubNavigationItemWorkout };
