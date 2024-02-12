import { type ReactElement } from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    useController,
} from 'react-hook-form';

type CheckboxProperties<T extends FieldValues> = {
    name: FieldPath<T>;
    label: string;
    control: Control<T>;
};

const Checkbox = <T extends FieldValues>({
    name,
    label,
    control,
}: CheckboxProperties<T>): ReactElement => {
    const { field } = useController<T>({ name, control });

    return (
        <div className="flex items-center">
            <input
                {...field}
                name={name}
                type="checkbox"
                id="toggle-checkbox"
                className="lm-yellow-100 relative h-4 w-7 cursor-pointer appearance-none rounded-full border-none outline-none transition duration-300"
            />
            <label className="cursor-pointer" htmlFor="toggle-checkbox">
                {label}
            </label>
        </div>
    );
};

export { Checkbox };
