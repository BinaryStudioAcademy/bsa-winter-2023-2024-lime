
import { Button, ButtonVariant } from '~/bundles/common/components/button/button.js';
import { Select } from '~/bundles/common/components/select/select.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getActivityOptions } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook.js';
import { type CreateScheduleRequest } from '~/bundles/common/types/types.js';

import { DEFAULT_SCHEDULE_FORM_VALUE } from './constants/constants.js';
import {
    scheduleValidationSchema
} from './validation-schemas/validation-schemas.js';

type Properties = {
    onSubmit: (payload: CreateScheduleRequest) => void;
    isLoading: boolean;
};

const CreateScheduleForm: React.FC<Properties> = ({ isLoading, onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<CreateScheduleRequest>({
        defaultValues: DEFAULT_SCHEDULE_FORM_VALUE,
        validationSchema: scheduleValidationSchema,
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
                    required
                />
                <Select
                    label="Goal"
                    name="activity"
                    control={control}
                    errors={errors}
                    options={[]}
                    isDisabled={isLoading}
                    required
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

export { CreateScheduleForm };
