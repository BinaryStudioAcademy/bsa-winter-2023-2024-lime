import {
    convertSecondsToHMS,
    getValidClassNames,
    metersToKilometers,
} from '~/bundles/common/helpers/helpers.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

type Properties = {
    workout: WorkoutResponseDto;
};

const WorkoutStats = ({ workout }: Properties): JSX.Element => {
    const { duration, distance, steps, kilocalories, heartRate, id } = workout;

    const workoutDistance = steps ?? metersToKilometers(distance);
    const distanceUnit = steps ? 'Steps' : 'km';

    const [hours, minutes, seconds] = convertSecondsToHMS(duration);

    const styles = {
        metrics: 'text-sm text-white animate-fade-in',
        units: 'text-sm text-lm-grey-200',
    };

    return (
        <div
            className="bg-lm-black-100 bg-wave-grey mt-[1.25rem] h-[19.8rem] rounded-[0.5rem] bg-contain bg-bottom bg-no-repeat"
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
                        <span className={styles.units}>h</span>{' '}
                        <span className={styles.metrics}>{minutes}</span>
                        <span className={styles.units}>m</span>{' '}
                        <span className={styles.metrics}>{seconds}</span>
                        <span className={styles.units}>s</span>
                    </p>

                    <p>
                        <span className={styles.metrics}>{kilocalories}</span>{' '}
                        <span className={styles.units}>kcal</span>
                    </p>

                    <p>
                        <span className={styles.metrics}>{heartRate}</span>{' '}
                        <span className={styles.units}>bpm</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export { WorkoutStats };
