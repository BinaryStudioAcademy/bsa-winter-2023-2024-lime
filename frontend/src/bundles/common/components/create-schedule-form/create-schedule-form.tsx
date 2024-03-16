import TimePicker from 'react-multi-date-picker/plugins/time_picker';

import {
    Button,
    ButtonVariant,
    DatePicker,
    Select,
} from '~/bundles/common/components/components.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { getActivityOptions } from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type CreateScheduleRequest } from '~/bundles/common/types/types.js';

import { DEFAULT_SCHEDULE_FORM_VALUE } from './constants/constants.js';
import { scheduleValidationSchema } from './validation-schemas/validation-schemas.js';

type Properties = {
    onSubmit: (payload: CreateScheduleRequest) => void;
    goalsList: SelectOption[];
    isLoading: boolean;
};

const CreateScheduleForm: React.FC<Properties> = ({
    isLoading,
    onSubmit,
    goalsList,
}) => {
    const { control, errors, handleSubmit } = useAppForm<CreateScheduleRequest>(
        {
            defaultValues: DEFAULT_SCHEDULE_FORM_VALUE,
            validationSchema: scheduleValidationSchema,
            mode: 'onTouched',
        },
    );

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

                <DatePicker
                    format="DD/MM/YYYY HH:mm"
                    plugins={[
                        <TimePicker position="bottom" hideSeconds key={1} />,
                    ]}
                    name="dateOfStart"
                    minDate={new Date()}
                    control={control}
                    errors={errors}
                    label="Date of start"
                    placeholder="DD/MM/YYYY HH:mm"
                    className="lg:col-start-1 lg:col-end-3"
                />

                <Select
                    label="Goal"
                    name="goalLabel"
                    control={control}
                    errors={errors}
                    options={goalsList}
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

export { CreateScheduleForm };
