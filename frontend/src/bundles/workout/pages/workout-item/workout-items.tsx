import {
    WorkoutRoute,
    WorkoutStats,
    WorkoutTitle,
} from '~/bundles/workout/components/components.js';
import { ActivityType } from '~/bundles/workout/enums/enums.js';

const WorkoutItem = (): JSX.Element => {
    const workout = {
        id: 3,
        activityType: ActivityType.WALKING,
        workoutStartedAt: new Date(),
        workoutEndedAt: new Date(),
        speed: 13,
        duration: 337,
        distance: 887,
        heartRate: 234,
        kilocalories: 1345,
    };

    return (
        <div className="w-full px-[1.5rem]">
            <WorkoutTitle workout={workout} />
            <WorkoutRoute workout={workout} />
            <WorkoutStats workout={workout} />
        </div>
    );
};

export { WorkoutItem };
