import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

import { useFilterWorkout } from '../../hooks/use-filter-workout.js';
import {
    SubNavigationFilter,
    SubNavigationWorkoutsList,
} from './components/components.js';

type Properties = {
    title?: string;
    button?: React.ReactNode;
};

const SubNavigationWorkout = ({ title, button }: Properties): JSX.Element => {
    const workouts = useAppSelector(({ workouts }) => workouts.workouts);
    const { handles, options, filteredWorkouts } = useFilterWorkout(workouts);

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
            <SubNavigationFilter options={options} handles={handles} />
            <SubNavigationWorkoutsList items={filteredWorkouts} />
            {button && (
                <div className="inline-flex justify-center">{button}</div>
            )}
        </div>
    );
};

export { SubNavigationWorkout };
