import {
    Button,
    ButtonVariant,
    Input,
    Select,
} from '~/bundles/common/components/components.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { capitalizeString } from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { ActivityType } from '~/bundles/goals/enums/enums.js';

import { GoalFrequency } from './enums/enums.js';
import { type CreateGoalRequest } from './types/types.js';
import { goalValidationSchema } from './validation-schemas/goal.validation-schema.js';

type Properties = {
    onSubmit: (payload: CreateGoalRequest) => void;
    isLoading: boolean;
};

const goalActivityToLabel: Record<ValueOf<typeof ActivityType>, string> = {
    [ActivityType.WALKING]: ActivityType.WALKING,
    [ActivityType.RUNNING]: ActivityType.RUNNING,
    [ActivityType.CYCLING]: ActivityType.CYCLING,
};

const goalActivityOptions: SelectOption[] = Object.entries(
    goalActivityToLabel,
).map(([value, label]) => ({
    value,
    label: capitalizeString(label),
}));

const goalFrequencyToLabel: Record<ValueOf<typeof GoalFrequency>, string> = {
    [GoalFrequency.ONE_PER_DAY]: '1 time a day',
    [GoalFrequency.TWO_PER_DAY]: '2 times a day',
    [GoalFrequency.ONE_PER_WEEK]: '1 time per week',
    [GoalFrequency.TWO_PER_WEEK]: '2 times per week',
    [GoalFrequency.THREE_PER_WEEK]: '3 times per week',
    [GoalFrequency.FIVE_PER_WEEK]: '5 times per week',
    [GoalFrequency.SEVEN_PER_WEEK]: '7 times per week',
};

const goalFrequencyOpitons: SelectOption[] = Object.entries(
    goalFrequencyToLabel,
).map(([value, label]) => ({
    value,
    label,
}));

const DEFAULT_CREATE_GOAL_PAYLOAD = {
    activity: goalActivityOptions[0]?.value as string,
    frequency: goalFrequencyOpitons[0]?.value as string,
    distance: '',
    duration: '',
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
