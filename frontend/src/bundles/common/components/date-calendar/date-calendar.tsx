import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type DateObject, Calendar } from 'react-multi-date-picker';

import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

type DateObjectProperties = DateObject | DateObject[] | null;

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T, null>;
    range: boolean;
    minDate?: Date;
    className?: string;
};
const DateCalendar = <T extends FieldValues>({
    range,
    control,
    name,
    minDate,
    className,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const onChange = useCallback(
        (dateObjects: DateObjectProperties) => {
            const value = range
                ? (dateObjects as DateObject[])?.map((date) => date.format())
                : (dateObjects as DateObject)?.format('DD/MM/YYYY');

            field.onChange(value);
        },
        [field],
    );

    return (
        <div className={className}>
            <Calendar
                onChange={onChange}
                value={field.value}
                className="custom-date-picker"
                range={range}
                minDate={minDate ?? ''}
            />
        </div>
    );
};

export { DateCalendar };
