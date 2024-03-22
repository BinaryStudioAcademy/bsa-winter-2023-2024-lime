import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import ReactDatePicker, { type DateObject } from 'react-multi-date-picker';
import ReactTimePicker from 'react-multi-date-picker/plugins/time_picker';

import { useCallback, useFormController } from '../../hooks/hooks.js';
import { Input } from '../components.js';

type DateObjectProperties = DateObject | DateObject[] | null;

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T, null>;
    errors: FieldErrors<T>;
    className?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
};

const TimePicker = <T extends FieldValues>({
    name,
    control,
    errors,
    className,
    label = '',
    placeholder = '',
    required = false,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const handleTimeSelect = useCallback(
        (date: DateObjectProperties): false | undefined => {
            if ((date as DateObject).isValid) {
                const formattedDate = (date as DateObject).format('HH:mm:ss');
                field.onChange(formattedDate);
                return;
            }

            return false;
        },
        [field],
    );

    return (
        <div className={className}>
            <ReactDatePicker
                disableDayPicker
                containerClassName={'custom-date-picker'}
                onChange={handleTimeSelect}
                format={'HH:mm:ss'}
                plugins={[<ReactTimePicker key="time-picker" />]}
                render={
                    <Input
                        type="text"
                        placeholder={placeholder}
                        label={label}
                        name={name}
                        control={control}
                        errors={errors}
                        required={required}
                    />
                }
            />
        </div>
    );
};

export { TimePicker };
