import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import ReactDatePicker, { type DateObject } from 'react-multi-date-picker';

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
};

const DatePicker = <T extends FieldValues>({
    name,
    control,
    errors,
    className,
    label = '',
    placeholder = '',
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const handleDaySelect = useCallback(
        (date: DateObjectProperties): false | undefined => {
            if ((date as DateObject).isValid) {
                const formattedDate = (date as DateObject).format('DD/MM/YYYY');
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
                containerClassName={'custom-date-picker'}
                onChange={handleDaySelect}
                offsetY={label ? -10 : -30}
                format="DD/MM/YYYY"
                render={
                    <Input
                        type="text"
                        placeholder={placeholder}
                        label={label}
                        name={name}
                        control={control}
                        errors={errors}
                    />
                }
            />
        </div>
    );
};

export { DatePicker };
