import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import { getValidClassNames } from '../../helpers/helpers.js';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    id: string;
    label: string;
    value: string;
    control: Control<T>;
};

const Radio = <T extends FieldValues>({
    name,
    id,
    label,
    value,
    control,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const classes = {
        container: 'flex items-center py-1',
        input: {
            checked: `checked:border-lm-yellow-100 checked:after:bg-lm-yellow-100
            checked:after:absolute checked:after:left-1/2 checked:after:top-1/2
            checked:after:h-2 checked:after:w-2 checked:after:rounded-full checked:after:[transform:translate(-50%,-50%)]`,
            base: 'peer/radio border-lm-grey-500 relative h-4 w-4 cursor-pointer appearance-none rounded-full border-2 bg-transparent',
        },
        label: 'text-lm-grey-500 peer-checked/radio:text-lm-grey-200 ml-2 text-base',
    };
    return (
        <div className={getValidClassNames(classes.container)}>
            <input
                {...field}
                id={id}
                value={value}
                checked={field.value === value}
                type="radio"
                className={getValidClassNames(
                    classes.input.base,
                    classes.input.checked,
                )}
            />
            <label htmlFor={name} className={getValidClassNames(classes.label)}>
                {label}
            </label>
        </div>
    );
};

export { Radio };
