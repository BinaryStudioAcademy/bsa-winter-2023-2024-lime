import { useAppSelector, useParams } from '~/bundles/common/hooks/hooks.js';
import {
    WorkoutRoute,
    WorkoutStats,
    WorkoutTitle,
} from '~/bundles/workouts/components/components.js';

const WorkoutItem = (): JSX.Element => {
    const { id } = useParams();

    const workouts = useAppSelector(({ workouts }) => workouts.workouts);

    const currentWorkout = workouts.find(
        (workout) => workout.id === Number(id),
    );

    if (!currentWorkout) {
        return (
            <p className="text-md text-primary text-center">
                You don&#39;t have such workout
            </p>
        );
    }

    return (
        <>
            <WorkoutTitle workout={currentWorkout} />
            <WorkoutRoute workout={currentWorkout} />
            <WorkoutStats workout={currentWorkout} />
        </>
    );
};

export { WorkoutItem };
