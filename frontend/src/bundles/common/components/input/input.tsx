import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { type FocusEventHandler } from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import {
    useCallback,
    useFormController,
    useState,
} from '~/bundles/common/hooks/hooks.js';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label: string;
    name: FieldPath<T>;
    type?: 'text' | 'email' | 'password';
    isDisabled?: boolean;
    placeholder?: string;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    required?: boolean;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    type = 'text',
    isDisabled = false,
    placeholder = '',
    onFocus,
    required = false,
}: Properties<T>): JSX.Element => {
    const [isMasked, setIsMasked] = useState(false);
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);
    const isPassword = type === 'password';

    const onMaskPassword = useCallback((): void => {
        setIsMasked((isMasked) => !isMasked);
    }, []);

    const placeholderGenerator = (): string => {
        return isPassword ? '\u2022'.repeat(6) : placeholder;
    };

    return (
        <label className="hmd:h-16 flex h-20 w-full flex-col text-sm">
            <span className="hmd:mb-0 mb-[0.5rem] font-medium">
                {label} {required && <span className="text-lm-red">*</span>}
            </span>
            <div className="relative">
                <input
                    {...field}
                    type={isMasked ? 'text' : type}
                    placeholder={placeholderGenerator()}
                    autoComplete="off"
                    disabled={isDisabled}
                    className={`bg-secondary text-primary placeholder:text-lm-grey-200 focus:border-buttonPrimary disabled:text-lm-grey-300 hmd:h-8 hsm:h-3 h-9 w-full rounded-lg p-4 focus:border focus:outline-none ${hasError && 'border-lm-red border'} ${isPassword && 'pr-8'}`}
                    onFocus={onFocus}
                />
                {isPassword && (
                    <div
                        onClick={onMaskPassword}
                        onKeyDown={onMaskPassword}
                        role="button"
                        tabIndex={-1}
                    >
                        {isMasked ? (
                            <EyeIcon className="text-lm-grey-200 absolute bottom-2 right-2 w-5" />
                        ) : (
                            <EyeSlashIcon className="text-lm-grey-200 absolute bottom-2 right-2 w-5" />
                        )}
                    </div>
                )}
            </div>
            {hasError && (
                <span className="text-lm-red bg-primary dark:text-lm-red rounded-lg px-3 text-sm dark:rounded-lg dark:bg-transparent dark:font-normal">
                    {error as string}
                </span>
            )}
        </label>
    );
};

export { Input };
