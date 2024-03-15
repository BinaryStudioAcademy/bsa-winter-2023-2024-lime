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

    const { workouts } = useAppSelector(({ workouts }) => workouts);

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
            {currentWorkout.provider === OAuthProvider.STRAVA && (
                <div className="text-strava-brand mt-[0.5rem] text-right">
                    <NavLink to={STRAVA_ATHLETE_TRAINING_URL} reloadDocument>
                        View on Strava
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export { WorkoutItem };
