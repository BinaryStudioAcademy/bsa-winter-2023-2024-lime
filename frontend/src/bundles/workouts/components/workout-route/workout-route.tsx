import { formatDate } from '~/bundles/common/helpers/helpers.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

type Properties = {
    workout: WorkoutResponseDto;
};

const WorkoutRoute = ({ workout }: Properties): JSX.Element => {
    const { workoutEndedAt } = workout;

    return (
        <div className="pt-[0.7rem]">
            <div className="flex justify-end gap-[2-rem] text-xs">
                <p className="text-action">
                    {formatDate(workoutEndedAt ?? new Date())}
                </p>
            </div>
        </div>
    );
};

export { WorkoutRoute };
