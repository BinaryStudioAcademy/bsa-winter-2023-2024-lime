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
                className="appearance-none w-7 h-4 lm-yellow-100 border-none rounded-full cursor-pointer relative transition duration-300 outline-none"
            />
            <label className="cursor-pointer" htmlFor="toggle-checkbox">
                {label}
            </label>
        </div>
    );
};

export { Checkbox };
