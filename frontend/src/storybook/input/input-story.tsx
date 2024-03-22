import { Input } from '~/bundles/common/components/input/input.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    name: 'text' | 'password';
    type: 'text' | 'email' | 'password';
    placeholder: string;
    label: string;
};

const InputStory = ({
    name,
    type,
    placeholder,
    label,
}: Properties): JSX.Element => {
    const { control, errors } = useAppForm<{ text: string; password: string }>({
        defaultValues: { text: '', password: '' },
    });
    return (
        <div className="w-80">
            <Input
                control={control}
                errors={errors}
                name={name}
                type={type}
                placeholder={placeholder}
                label={label}
            />
        </div>
    );
};

export { InputStory };
