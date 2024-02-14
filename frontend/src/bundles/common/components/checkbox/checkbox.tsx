
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { CheckIconComponent } from '../icons/icons.js';

type CheckboxProperties<T extends FieldValues> = {
    name: FieldPath<T>;
    label: string;
    control: Control<T>;
    errors: FieldErrors<T>;
};

const classes = {
    containerCheckbox: 'border-lm-grey-100 relative flex h-5 w-5 items-center justify-center rounded-sm border-2 has-[:checked]:border-none',
    baseCheckbox:
        'checked:bg-lm-yellow-100 relative h-5 w-5 cursor-pointer appearance-none rounded-sm bg-transparent transition duration-300 checked:rounded-sm peer',
    checkIcon: 'absolute z-[1] hidden pointer-events-none left-0 top-0 flex h-full w-full items-center justify-center hidden peer-[:checked]:flex'
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
        <div className="flex items-center gap-2">
            <div className={getValidClassNames(classes.containerCheckbox)}>
                <input
{...field}
                    name={name}
                    type="checkbox"
                    id="toggle-checkbox"
                    className={getValidClassNames(classes.baseCheckbox)}
                />
                <CheckIconComponent className={getValidClassNames(classes.checkIcon)} />
            </div>
            <label
                className={getValidClassNames(
                    field.value ? 'text-lm-grey-200' : 'text-lm-grey-500',
                    'cursor-pointer',
                )}
                htmlFor="toggle-checkbox"
            >
                {label}
                {hasError && (
                    <span className="text-lm-red">{error as string}</span>
                )}
            </label>
        </div>
    );
};

export { Checkbox };
