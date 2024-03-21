import { Toggle } from '~/bundles/common/components/components.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

const ToggleStory = ({ label }: { label: string }): JSX.Element => {
    const { control, errors } = useAppForm<{ toggle: string }>({
        defaultValues: { toggle: '' },
    });
    return (
        <Toggle control={control} errors={errors} label={label} name="toggle" />
    );
};

export { ToggleStory };
