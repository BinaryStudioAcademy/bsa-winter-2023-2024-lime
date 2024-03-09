import { type WorkoutResponseDto } from 'shared';

import { SubNavigationItemWorkout } from './sub-navigation-item.js';

type SubNavigationWorkoutsListProperties = {
    items: WorkoutResponseDto[];
};

const SubNavigationWorkoutsList = ({
    items,
}: SubNavigationWorkoutsListProperties): JSX.Element => {
    return (
        <div className="h-full w-full overflow-y-scroll sm:h-fit sm:max-h-40 md:max-h-72 lg:h-fit lg:max-h-[30rem]">
            <ul className="flex h-full w-full flex-col overflow-x-hidden sm:gap-2 md:gap-3">
                {items.map((item) => (
                    <SubNavigationItemWorkout item={item} key={item.id} />
                ))}
            </ul>
        </div>
    );
};

export { SubNavigationWorkoutsList };
