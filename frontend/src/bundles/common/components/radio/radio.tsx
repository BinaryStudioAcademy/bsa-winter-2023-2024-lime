import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '../../hooks/hooks.js';

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

    return (
        <div className="flex items-center py-1">
            <input
                {...field}
                id={id}
                value={value}
                checked={field.value === value}
                type="radio"
                className="peer/radio border-lm-grey-500 checked:border-lm-yellow-100 checked:after:bg-lm-yellow-100 relative h-4 w-4
                cursor-pointer appearance-none rounded-full border-2 bg-transparent checked:after:absolute checked:after:left-1/2 checked:after:top-1/2
                checked:after:h-2 checked:after:w-2 checked:after:rounded-full checked:after:[transform:translate(-50%,-50%)]"
            />
            <label
                htmlFor={name}
                className="text-lm-grey-500 peer-checked/radio:text-lm-grey-200 ml-2 text-base"
            >
                {label}
            </label>
        </div>
    );
};

export { Radio };
