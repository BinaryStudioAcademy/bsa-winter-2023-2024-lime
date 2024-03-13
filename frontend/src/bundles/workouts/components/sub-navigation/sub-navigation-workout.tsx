import { useAppSelector, useState } from '~/bundles/common/hooks/hooks.js';
import {
    mapWorkoutActivitySelect,
    mapWorkoutYearSelect,
} from '~/bundles/workouts/helpers/helpers.js';

import { SubNavigationFilter } from './components/sub-navigation-filter.js';
import { SubNavigationWorkoutsList } from './components/sub-navigation-list.js';

type SubNavigationProperties = {
    title?: string;
};

const SubNavigationWorkout = ({
    title,
}: SubNavigationProperties): JSX.Element => {
    const workouts = useAppSelector(({ workouts }) => workouts.workouts);
    const [localItems, setItems] = useState([...workouts]);
    const sortedItems = localItems.toSorted((a, b) => {
        return b.workoutStartedAt.getTime() - a.workoutStartedAt.getTime();
    });

    return (
        <div
            className={
                'mt-[2rem] flex h-[90%] w-full flex-col gap-[1.75rem] sm:mb-10 sm:min-h-[5rem] sm:flex-col sm:gap-1 md:mb-20 md:min-w-[20rem] md:gap-4 lg:w-[20rem]'
            }
        >
            {title && (
                <h1 className="text-primary text-center text-xl font-bold">
                    {title}
                </h1>
            )}
            <SubNavigationFilter
                items={sortedItems}
                setItems={setItems}
                mapWorkoutActivitySelect={mapWorkoutActivitySelect}
                mapWorkoutYearSelect={mapWorkoutYearSelect}
            />
            <SubNavigationWorkoutsList items={sortedItems} />
        </div>
    );
};

export { SubNavigationWorkout };
