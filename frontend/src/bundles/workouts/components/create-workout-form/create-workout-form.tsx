import {
    Button,
    ButtonVariant,
    DatePicker,
    Input,
    Select,
    TimePicker,
} from '~/bundles/common/components/components.js';
import { ActivityType, ComponentSize } from '~/bundles/common/enums/enums.js';
import {
    configureDate,
    convertKMPHtoMPS,
    convertToMeters,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useFormWatch,
} from '~/bundles/common/hooks/hooks.js';
import {
    type CreateWorkoutPayload,
    type WorkoutRequestDto,
} from '~/bundles/workouts/types/types.js';

import {
    DEFAULT_CREATE_WORKOUT_PAYLOAD,
    WORKOUT_ACTIVITY_OPTIONS,
} from './constants/constants.js';
import { createWorkoutValidationSchema } from './validation-schemas/validation-schemas.js';

type Properties = {
    onSubmit: (payload: WorkoutRequestDto) => void;
    isLoading: boolean;
};

const CreateWorkoutForm: React.FC<Properties> = ({
    onSubmit,
    isLoading,
}): JSX.Element => {
    const { control, errors, handleSubmit } = useAppForm<CreateWorkoutPayload>({
        defaultValues: DEFAULT_CREATE_WORKOUT_PAYLOAD,
        validationSchema: createWorkoutValidationSchema,
        mode: 'onTouched',
    });

    const activityTypeValue = useFormWatch({
        name: 'activityType',
        control,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit((data) => {
                const payload: WorkoutRequestDto = {
                    activityType: data.activityType,
                    workoutStartedAt: configureDate(
                        data.workoutDate,
                        data.workoutStartedAt,
                    ) as Date,
                    workoutEndedAt: configureDate(
                        data.workoutDate,
                        data.workoutEndedAt,
                    ) as Date,
                    speed: convertKMPHtoMPS(Number(data.speed)),
                    distance: convertToMeters(Number(data.distance)),
                    kilocalories: Number(data.kilocalories),
                    heartRate: data.heartRate ? Number(data.heartRate) : null,
                    ...(data.steps && { steps: Number(data.steps) }),
                    provider: null,
                };
                onSubmit(payload);
            })(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <form
            className="text-primary w-full px-1 text-sm"
            onSubmit={handleFormSubmit}
        >
            <div className="grid grid-cols-1 gap-6 pb-10 md:grid-cols-6 md:grid-rows-4">
                <div className="md:col-span-6">
                    <Select
                        label="Type of activity"
                        name="activityType"
                        control={control}
                        errors={errors}
                        options={WORKOUT_ACTIVITY_OPTIONS}
                        isDisabled={isLoading}
                        required
                    />
                </div>
                <DatePicker
                    className="md:col-span-2"
                    control={control}
                    errors={errors}
                    name="workoutDate"
                    label="Date"
                    placeholder="Enter date"
                />
                <TimePicker
                    className="md:col-span-2"
                    control={control}
                    errors={errors}
                    name="workoutStartedAt"
                    label="Start"
                    placeholder="Enter start time"
                />
                <TimePicker
                    className="md:col-span-2"
                    control={control}
                    errors={errors}
                    name="workoutEndedAt"
                    label="End"
                    placeholder="Enter end time"
                />
                <Input
                    className="md:col-span-2"
                    type="text"
                    name="distance"
                    label="Distance (km)"
                    placeholder="Enter distance"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                    required
                />
                <Input
                    className="md:col-span-2"
                    type="text"
                    name="speed"
                    label="Speed (km/h)"
                    placeholder="Enter speed"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                    required
                />

                <Input
                    className="md:col-span-2"
                    type="text"
                    name="kilocalories"
                    label="Kilocalories"
                    placeholder="Enter kcal"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                    required
                />
                <Input
                    className="md:col-span-3"
                    type="text"
                    name="heartRate"
                    label="Heart rate (bpm)"
                    placeholder="Enter heart rate"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
                {activityTypeValue === ActivityType.WALKING && (
                    <Input
                        className="md:col-span-3"
                        type="text"
                        name="steps"
                        label="Steps"
                        placeholder="Enter steps"
                        control={control}
                        errors={errors}
                        isDisabled={isLoading}
                        required
                    />
                )}
            </div>

            <Button
                type="submit"
                label="Save"
                variant={ButtonVariant.PRIMARY}
                size={ComponentSize.MEDIUM}
                isDisabled={isLoading}
            />
        </form>
    );
};

export { CreateWorkoutForm };
