import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import ReactDatePicker, {
    type DateObject,
    type Plugin,
} from 'react-multi-date-picker';

import { useCallback, useFormController } from '../../hooks/hooks.js';
import { Input } from '../components.js';

type DateObjectProperties = DateObject | DateObject[] | null;

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T, null>;
    errors: FieldErrors<T>;
    format: string;
    plugins?: Plugin[];
    className?: string;
    label?: string;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    required?: boolean;
};

const DatePicker = <T extends FieldValues>({
    name,
    control,
    errors,
    format,
    plugins,
    minDate,
    maxDate,
    className,
    label = '',
    placeholder = '',
    required = false,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const handleDaySelect = useCallback(
        (date: DateObjectProperties): false | undefined => {
            if ((date as DateObject).isValid) {
                const formattedDate = (date as DateObject).format(format);
                field.onChange(formattedDate);
                return;
            }

            return false;
        },
        [field, format],
    );
    return (
        <div className={className}>
            <ReactDatePicker
                minDate={minDate ?? ''}
                maxDate={maxDate ?? ''}
                containerClassName={'custom-date-picker'}
                onChange={handleDaySelect}
                offsetY={label ? -10 : -30}
                format={format}
                value={field.value}
                plugins={plugins ?? []}
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

export { DatePicker };
