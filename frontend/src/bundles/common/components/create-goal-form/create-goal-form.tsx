import {
    Button,
    ButtonVariant,
    Input,
    Select,
} from '~/bundles/common/components/components.js';
import { DEFAULT_CREATE_GOAL_PAYLOAD } from '~/bundles/common/components/create-goal-form/constants/constants.js';
import { setGoalFrequencyOpitons } from '~/bundles/common/components/create-goal-form/helpers/helpers.js';
import { goalValidationSchema } from '~/bundles/common/components/create-goal-form/validation-schemas/goal.validation-schema.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { getActivityOptions } from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { type CreateGoalRequest } from '~/bundles/common/types/types.js';

type Properties = {
    onSubmit: (payload: CreateGoalRequest) => void;
    isLoading: boolean;
};

const CreateGoalForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const { control, errors, handleSubmit, watch, clearErrors } =
        useAppForm<CreateGoalRequest>({
            defaultValues: DEFAULT_CREATE_GOAL_PAYLOAD,
            validationSchema: goalValidationSchema,
            mode: 'onTouched',
        });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const distanceValue = watch('distance');
    const durationValue = watch('duration');

    useEffect(() => {
        if (distanceValue) {
            clearErrors('duration');
        }
        if (durationValue) {
            clearErrors('distance');
        }
    }, [clearErrors, distanceValue, durationValue]);

    return (
        <form
            className="text-primary w-full text-sm md:w-[22.375rem]"
            onSubmit={handleFormSubmit}
        >
            <div className="mb-10 flex flex-col gap-6">
                <Select
                    label="Type of activity"
                    name="activity"
                    control={control}
                    errors={errors}
                    options={getActivityOptions}
                    isDisabled={isLoading}
                    isRequired
                />

                <Select
                    label="Frequency"
                    name="frequency"
                    control={control}
                    errors={errors}
                    options={setGoalFrequencyOpitons}
                    isDisabled={isLoading}
                    isRequired
                />

                <Input
                    type="text"
                    name="distance"
                    label="Distance (km)"
                    placeholder="Enter distance"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />

                <Input
                    type="text"
                    label="Duration (min)"
                    placeholder="Enter duration"
                    name="duration"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
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

export { CreateGoalForm };
