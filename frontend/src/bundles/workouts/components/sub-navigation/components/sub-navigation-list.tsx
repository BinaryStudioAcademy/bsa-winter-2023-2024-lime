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
        <div className="h-full w-full sm:h-3/6 md:h-3/6 lg:h-5/6">
            <ul
                className="flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll sm:gap-1 md:gap-3"
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
