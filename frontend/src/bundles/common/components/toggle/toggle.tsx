import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useFormController } from '~/bundles/common/hooks/hooks.js';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label: string;
    name: FieldPath<T>;
};

const classes = {
    base: 'h-5 w-10 appearance-none rounded-full bg-transparent transition ease-in-out duration-300',
    slot: 'after:transition after:ease-in-out after:duration-300 after:absolute after:z-[2] after:h-5 after:w-10 after:rounded-full after:border-2 after:border-lm-grey-500 after:bg-transparent after:content-[""]',
    circle: 'before:transition before:ease-in-out before:duration-300 before:top-1 before:left-1 before:bg-lm-grey-300 before:pointer-events-none before:absolute before:h-3 before:w-3 before:rounded-full before:content-[""]',
    checked:
        'checked:after:border-lm-yellow-100 checked:before:bg-lm-yellow-100  checked:before:translate-x-5',
    focused: 'focus:outline-lm-yellow-200',
};

const Toggle = <T extends FieldValues>({
    control,
    label,
    errors,
    name,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <div>
            <label
                className={`${
                    field.value ? 'text-lm-grey-200' : 'text-lm-grey-500'
                }  checked:text-lm-grey-200 relative flex items-center gap-2 text-[1rem] font-medium leading-[1.3rem] hover:cursor-pointer`}
            >
                <input
                    {...field}
                    type="checkbox"
                    className={getValidClassNames(
                        classes.base,
                        classes.slot,
                        classes.circle,
                        classes.focused,
                        field.value ? classes.checked : '',
                    )}
                />
                {label}
                {hasError && (
                    <span className="text-lm-red">{error as string}</span>
                )}
            </label>
        </div>
    );
};

export { Toggle };
