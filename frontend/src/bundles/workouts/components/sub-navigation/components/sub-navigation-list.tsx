import { type WorkoutGetAllResponseDto } from '~/bundles/workouts/types/types.js';

import { SubNavigationItemWorkout } from './components.js';

const SubNavigationWorkoutsList = ({
    items,
}: WorkoutGetAllResponseDto): JSX.Element => {
    return (
        <div className="max-h-[15rem] overflow-y-scroll sm:h-[10rem]  sm:max-h-[10rem] md:h-[90%] md:max-h-full lg:h-fit lg:max-h-[30rem]">
            <ul className="flex h-full flex-col sm:gap-2 md:gap-3">
                {items.map((item) => (
                    <SubNavigationItemWorkout item={item} key={item.id} />
                ))}
            </ul>
        </div>
    );
};

export { SubNavigationWorkoutsList };
