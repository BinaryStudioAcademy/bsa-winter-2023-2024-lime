import { formatDate } from '~/bundles/common/helpers/helpers.js';
import { type WorkoutResponseDto } from '~/bundles/workout/types/types.js';

type Properties = {
    workout: WorkoutResponseDto;
};

const WorkoutRoute = ({ workout }: Properties): JSX.Element => {
    const { workoutEndedAt } = workout;

    return (
        <div className="pt-[0.7rem]">
            <div className="flex justify-end gap-[2-rem] text-xs">
                <p className="text-lm-yellow-100">
                    {formatDate(workoutEndedAt ?? new Date())}
                </p>
            </div>
        </div>
    );
};

export { WorkoutRoute };
