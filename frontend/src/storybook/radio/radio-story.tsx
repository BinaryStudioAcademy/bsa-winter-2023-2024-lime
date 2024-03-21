import { Radio } from '~/bundles/common/components/components.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

const RadioStory = ({
    label,
    value,
    type,
}: {
    label: string;
    value: string;
    type: 'round' | 'card';
}): JSX.Element => {
    const { control } = useAppForm<{ radio: string }>({
        defaultValues: { radio: '' },
    });
    return (
        <Radio
            control={control}
            id="123"
            label={label}
            value={value}
            name="radio"
            type={type}
        />
    );
};

export { RadioStory };
