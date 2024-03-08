import { type WorkoutResponseDto } from 'shared';

import { useEffect, useRef } from '~/bundles/common/hooks/hooks.js';

import { SubNavigationItemWorkout } from './sub-navigation-item.js';

type SubNavigationWorkoutsListProperties = {
    items: WorkoutResponseDto[];
};

const SubNavigationWorkoutsList = ({
    items,
}: SubNavigationWorkoutsListProperties): JSX.Element => {
    const reference = useRef(null as unknown as HTMLUListElement);
    useEffect(() => {
        if (reference.current) {
            reference.current.scrollTop = 0;
        }
    }, [items]);
    return (
        <div className="h-full w-full overflow-y-scroll sm:h-fit sm:max-h-72 md:h-fit lg:h-fit lg:max-h-[30rem]">
            <ul
                className="flex h-full w-full flex-col overflow-x-hidden  sm:gap-1 md:gap-3"
                ref={reference}
            >
                {items.map((item) => (
                    <SubNavigationItemWorkout item={item} key={item.id} />
                ))}
            </ul>
        </div>
    );
};

export { SubNavigationWorkoutsList };
