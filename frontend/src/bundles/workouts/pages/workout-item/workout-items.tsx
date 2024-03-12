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
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="font-base text-primary text-xl">
                    You don&#39;t have such workout
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-[50rem]">
            <WorkoutTitle workout={currentWorkout} />
            <WorkoutRoute workout={currentWorkout} />
            <WorkoutStats workout={currentWorkout} />
        </div>
    );
};

export { WorkoutItem };
