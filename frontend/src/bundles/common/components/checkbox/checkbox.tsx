import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

type CheckboxProperties<T extends FieldValues> = {
    name: FieldPath<T>;
    label: string;
    control: Control<T>;
    errors: FieldErrors<T>;
};

const Checkbox = <T extends FieldValues>({
    name,
    label,
    control,
    errors,
}: CheckboxProperties<T>): JSX.Element => {
    const { field } = useFormController<T>({ name, control });
    const error = errors[name]?.message;
    const hasError = Boolean(error);
    return (
        <div className="flex items-center">
            <input
                {...field}
                name={name}
                type="checkbox"
                id="toggle-checkbox"
                className="bg-lm-yellow-100 relative h-4 w-7 cursor-pointer appearance-none rounded-full border-none outline-none transition duration-300"
            />
            <label className="cursor-pointer" htmlFor="toggle-checkbox">
                {label}
                {hasError && (
                    <span className="text-lm-red">{error as string}</span>
                )}
            </label>
        </div>
    );
};

export { Checkbox };
