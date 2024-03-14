import {
    WorkoutRoute,
    WorkoutStats,
    WorkoutTitle,
} from '~/bundles/workouts/components/components.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

type Properties = {
    workout: WorkoutResponseDto | null;
};

const ProfileWorkoutItem: React.FC<Properties> = ({ workout }) => {
    if (!workout) {
        return (
            <p className="text-md text-center text-white">
                User don&#39;t have workouts yet
            </p>
        );
    }

    return (
        <>
            <WorkoutTitle workout={workout} />
            <WorkoutRoute workout={workout} />
            <WorkoutStats workout={workout} />
        </>
    );
};

export { ProfileWorkoutItem };
