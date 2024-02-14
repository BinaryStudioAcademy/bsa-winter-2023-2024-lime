import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import ReactDatePicker, { type DateObject } from 'react-multi-date-picker';

import { getFormatDate } from '../../helpers/helpers.js';
import { useCallback, useFormController } from '../../hooks/hooks.js';
import { Input } from '../components.js';

type DateObjectProperties = DateObject | DateObject[] | null;

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T, null>;
    errors: FieldErrors<T>;
};

const DatePicker = <T extends FieldValues>({
    name,
    control,
    errors,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const handleDaySelect = useCallback(
        (date: DateObjectProperties): false | undefined => {
            if (date) {
                field.onChange(getFormatDate(date.toString()));
            } else {
                field.onChange('');
                return false;
            }
        },
        [field],
    );

    return (
        <ReactDatePicker
            containerClassName={'custom-date-picker'}
            onChange={handleDaySelect}
            render={
                <Input
                    type="text"
                    placeholder={'Choose the date'}
                    label="Choose date"
                    name={name}
                    control={control}
                    errors={errors}
                />
            }
        />
    );
};

export { DatePicker };
