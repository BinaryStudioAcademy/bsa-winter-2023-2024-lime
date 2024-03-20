import {
    capitalizeFirstLetter,
    convertSecondsToHMS,
    getTimeFromDate,
    getValidClassNames,
    metersToKilometers,
} from '~/bundles/common/helpers/helpers.js';
import { WorkoutUnit } from '~/bundles/workouts/enums/enums.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

type Properties = {
    workout: WorkoutResponseDto;
};

const WorkoutStats: React.FC<Properties> = ({ workout }): JSX.Element => {
    const {
        duration,
        distance,
        steps,
        kilocalories,
        heartRate,
        id,
        workoutEndedAt,
    } = workout;

    const workoutDistance = steps ?? metersToKilometers(distance);
    const distanceUnit = steps
        ? capitalizeFirstLetter(WorkoutUnit.STEPS)
        : WorkoutUnit.KILOMETERS;

    const [hours, minutes, seconds] = convertSecondsToHMS(duration);

    const styles = {
        metrics: 'text-sm text-primary animate-fade-in',
        units: 'text-sm text-lm-grey-200',
    };

    return (
        <div
            className="bg-primary bg-wave-grey mt-[1.25rem] h-[15rem] w-full rounded-[0.5rem] bg-contain bg-bottom bg-no-repeat lg:h-[19.8rem]"
            key={id}
        >
            <div className="px-[1.875rem] py-[1.25rem]">
                <p>
                    <span
                        className={getValidClassNames(
                            [styles.metrics],
                            '!text-3xl',
                        )}
                    >
                        {workoutDistance}
                    </span>{' '}
                    <span
                        className={getValidClassNames(
                            [styles.units],
                            '!text-3xl',
                        )}
                    >
                        {distanceUnit}
                    </span>
                </p>
                <div className="flex gap-8">
                    <p>
                        <span className={styles.metrics}>{hours}</span>
                        <span className={styles.units}>
                            {WorkoutUnit.HOURS}
                        </span>{' '}
                        <span className={styles.metrics}>{minutes}</span>
                        <span className={styles.units}>
                            {WorkoutUnit.MINUTES}
                        </span>{' '}
                        <span className={styles.metrics}>{seconds}</span>
                        <span className={styles.units}>
                            {WorkoutUnit.SECONDS}
                        </span>
                    </p>

                    {Boolean(kilocalories) && (
                        <p>
                            <span className={styles.metrics}>
                                {kilocalories}
                            </span>{' '}
                            <span className={styles.units}>
                                {WorkoutUnit.KILOCALORIES}
                            </span>
                        </p>
                    )}

                    {Boolean(heartRate) && (
                        <p>
                            <span className={styles.metrics}>{heartRate}</span>{' '}
                            <span className={styles.units}>
                                {WorkoutUnit.BEATS_PER_MINUTE}
                            </span>
                        </p>
                    )}
                </div>
                <div className="bg-progress-line bg-tip relative ml-[-1.875rem] mr-[5.75rem] mt-[2.5rem] h-[6.8rem] w-full bg-contain bg-no-repeat lg:w-5/6">
                    <span
                        className={getValidClassNames(
                            [styles.metrics],
                            'absolute right-[-1rem] top-[-1.3rem]',
                        )}
                    >
                        {getTimeFromDate(workoutEndedAt)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export { WorkoutStats };
