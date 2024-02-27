import {
    Button,
    ButtonVariant,
    Input,
    Select,
} from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import { DEFAULT_CREATE_GOAL_PAYLOAD } from './constants/constants.js';
import { goalActivityOptions, goalFrequencyOpitons } from './enums/enums.js';
import { type CreateGoalRequest } from './types/types.js';
import { goalValidationSchema } from './validation-schemas/goal.validation-schema.js';

type Properties = {
    onSubmit: (payload: CreateGoalRequest) => void;
    isLoading: boolean;
};

const CreateGoalForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const { control, errors, handleSubmit } = useAppForm<CreateGoalRequest>({
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

    return (
        <form
            className="w-80 text-sm text-white md:w-[22.375rem]"
            onSubmit={handleFormSubmit}
        >
            <div className="mb-10 flex flex-col gap-6">
                <Select
                    label="Type of activity"
                    name="activity"
                    control={control}
                    errors={errors}
                    options={goalActivityOptions}
                    isDisabled={isLoading}
                    required
                />

                <Select
                    label="Frequency"
                    name="frequency"
                    control={control}
                    errors={errors}
                    options={goalFrequencyOpitons}
                    isDisabled={isLoading}
                    required
                />

                <Input
                    type="text"
                    label="Distance (km)"
                    placeholder="Enter distance"
                    name="distance"
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
