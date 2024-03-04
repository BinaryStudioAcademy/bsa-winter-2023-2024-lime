import { useAppSelector, useParams } from '~/bundles/common/hooks/hooks.js';
import {
    WorkoutRoute,
    WorkoutStats,
    WorkoutTitle,
} from '~/bundles/workouts/components/components.js';

const WorkoutItem = (): JSX.Element => {
    const { id } = useParams();

    const { workouts } = useAppSelector(({ workouts }) => ({
        workouts: workouts.workouts,
    }));

    const currentWorkout = workouts.find(
        (workout) => workout.id === Number(id),
    );

    if (!currentWorkout) {
        return <span>Not found</span>;
    }

    return (
        <div className="w-full max-w-[50rem] px-[1.5rem]">
            <WorkoutTitle workout={currentWorkout} />
            <WorkoutRoute workout={currentWorkout} />
            <WorkoutStats workout={currentWorkout} />
        </div>
    );
};

export { WorkoutItem };
