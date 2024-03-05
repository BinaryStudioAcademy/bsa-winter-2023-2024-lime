import { Checkbox } from '~/bundles/common/components/checkbox/checkbox.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

const CheckboxStory = ({ label }: { label: string }): JSX.Element => {
    const { control, errors } = useAppForm<{ checkbox: boolean }>({
        defaultValues: { checkbox: false },
    });
    return (
        <Checkbox
            control={control}
            errors={errors}
            label={label}
            ariaLabel="Check it"
            name="checkbox"
        />
    );
};

export { CheckboxStory };
