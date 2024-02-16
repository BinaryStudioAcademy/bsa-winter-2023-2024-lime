import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

type Properties<T extends FieldValues> = {
    classname?: string;
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label: string;
    name: FieldPath<T>;
    type?: 'text' | 'email';
    isDisabled?: boolean;
    placeholder?: string;
};

const Input = <T extends FieldValues>({
    classname = '',
    control,
    errors,
    label,
    name,
    type = 'text',
    isDisabled = false,
    placeholder = '',
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);
    return (
        <label className={`${classname} flex h-20 flex-col text-sm text-white`}>
            <span className="font-medium">{label}</span>
            <input
                {...field}
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                disabled={isDisabled}
                className={`bg-lm-black-100 text-lm-grey-100 placeholder:text-lm-grey-200 focus:border-lm-yellow-100 disabled:text-lm-grey-300 h-9 max-w-[358px] rounded-lg border p-4 focus:outline-none ${hasError && 'border-lm-red'}`}
            />
            {hasError && <span className="text-lm-red">{error as string}</span>}
        </label>
    );
};

export { Input };
