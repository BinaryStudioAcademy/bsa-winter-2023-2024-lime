import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector, useParams } from '~/bundles/common/hooks/hooks.js';
import {
    WorkoutRoute,
    WorkoutStats,
    WorkoutTitle,
} from '~/bundles/workouts/components/components.js';
import { OAuthProvider } from '~/bundles/workouts/enums/enums.js';

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
            <p className="text-md text-center text-white">
                You don&#39;t have such workout
            </p>
        );
    }

    return (
        <>
            <WorkoutTitle workout={currentWorkout} />
            <WorkoutRoute workout={currentWorkout} />
            <WorkoutStats workout={currentWorkout} />
            {currentWorkout.provider === OAuthProvider.STRAVA && (
                <Link
                    to={AppRoute.STRAVA}
                    className="text-strava-brand mt-[0.5rem] text-right"
                >
                    View on Strava
                </Link>
            )}
        </>
    );
};

export { WorkoutItem };
