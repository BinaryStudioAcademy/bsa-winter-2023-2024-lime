import { DatePicker } from '~/bundles/common/components/date-picker/date-picker.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

const DatePickerStory = ({
    label,
    placeholder,
    className,
}: {
    label: string;
    placeholder: string;
    className: string;
}): JSX.Element => {
    const { control, errors } = useAppForm<{ date: string }>({
        defaultValues: { date: '' },
    });

    return (
        <DatePicker
            control={control}
            errors={errors}
            name="date"
            format="DD/MM/YYYY"
            label={label}
            placeholder={placeholder}
            className={className}
        />
    );
};

export { DatePickerStory };
