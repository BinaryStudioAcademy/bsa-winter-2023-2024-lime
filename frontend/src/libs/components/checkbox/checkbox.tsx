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
        <div className="">
            <input
                {...field}
                name={name}
                type="checkbox"
                id="toggle-checkbox"
                className=""
            />
            <label className="" htmlFor="toggle-checkbox">
                {label}
            </label>
        </div>
    );
};

export { Checkbox };
