import { NavLink } from 'react-router-dom';

import { useAppSelector, useParams } from '~/bundles/common/hooks/hooks.js';
import {
    WorkoutRoute,
    WorkoutStats,
    WorkoutTitle,
} from '~/bundles/workouts/components/components.js';
import { STRAVA_ATHLETE_TRAINING_URL } from '~/bundles/workouts/constants/constants.js';
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
                <NavLink
                    to={STRAVA_ATHLETE_TRAINING_URL}
                    className="text-strava-brand mt-[0.5rem] text-right"
                    reloadDocument
                >
                    View on Strava
                </NavLink>
            )}
        </>
    );
};

export { WorkoutItem };
