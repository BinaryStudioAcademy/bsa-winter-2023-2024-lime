import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import { getValidClassNames } from '../../helpers/helpers.js';

type CheckboxProperties<T extends FieldValues> = {
    name: FieldPath<T>;
    label: string;
    control: Control<T>;
    errors: FieldErrors<T>;
};

const classes = {
    base: 'accent-lm-yellow-100 relative h-5 w-5 checked:rounded-sm cursor-pointer rounded-2 border-none outline-1 rounded-sm transition duration-300',
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
                className={getValidClassNames(
                    field.value ? 'text-lm-grey-200' : 'text-lm-grey-500',
                    classes.base,
                )}
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
