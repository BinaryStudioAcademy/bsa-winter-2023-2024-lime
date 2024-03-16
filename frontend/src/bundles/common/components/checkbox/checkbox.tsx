import { CheckIcon } from '@heroicons/react/16/solid';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import { getValidClassNames } from '../../helpers/helpers.js';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    label: string;
    ariaLabel: string;
    control: Control<T>;
    errors: FieldErrors<T>;
};

const classes = {
    containerCheckbox:
        'border-lm-grey-100 relative flex h-5 w-5 items-center justify-center rounded-sm border-2 has-[:checked]:border-none',
    baseCheckbox:
        'relative h-5 w-5 cursor-pointer appearance-none rounded-sm bg-transparent transition duration-300 peer',
    Checkboxchecked: 'checked:bg-lm-yellow-100 checked:rounded-sm',
    Checkboxfocused: 'focus:outline-lm-yellow-200',
    checkIcon:
        'absolute z-[1] hidden pointer-events-none left-0 top-0 flex h-full w-full items-center justify-center hidden peer-[:checked]:flex',
    label: 'cursor-pointer ',
};

const Checkbox = <T extends FieldValues>({
    name,
    label,
    ariaLabel,
    control,
    errors,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController<T>({ name, control });
    const error = errors[name]?.message;
    const hasError = Boolean(error);
    return (
        <>
            <div className="flex items-center gap-2">
                <div className={getValidClassNames(classes.containerCheckbox)}>
                    <input
                        {...field}
                        name={name}
                        type="checkbox"
                        id="toggle-checkbox"
                        aria-label={ariaLabel}
                        className={getValidClassNames(
                            classes.baseCheckbox,
                            classes.Checkboxchecked,
                            classes.Checkboxfocused,
                        )}
                    />
                    <CheckIcon
                        className={getValidClassNames(classes.checkIcon)}
                    />
                </div>
                <label
                    className={getValidClassNames(
                        field.value ? 'text-lm-grey-200' : 'text-lm-grey-500',
                        classes.label,
                    )}
                    htmlFor="toggle-checkbox"
                >
                    {label}
                </label>
            </div>
            {hasError && <span className="text-lm-red">{error as string}</span>}
        </>
    );
};

export { Checkbox };
