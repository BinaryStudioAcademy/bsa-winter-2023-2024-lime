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

import { getValidClassNames } from '../../helpers/helpers.js';
import { ErrorMessageWithHint } from './components/error-message-with-hint.js';

type Properties<T extends FieldValues> = {
    className?: string;
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: string;
    name: FieldPath<T>;
    type?: 'text' | 'email' | 'password';
    isDisabled?: boolean;
    placeholder?: string;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    required?: boolean;
    hasVisuallyHiddenLabel?: boolean;
    rows?: number;
};

const Input = <T extends FieldValues>({
    className = '',
    control,
    errors,
    label,
    name,
    type = 'text',
    isDisabled = false,
    placeholder = '',
    onFocus,
    required = false,
    hasVisuallyHiddenLabel,
    rows,
}: Properties<T>): JSX.Element => {
    const [isMasked, setIsMasked] = useState(false);
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);
    const isPassword = type === 'password';

    const isTextArea = Boolean(rows);

    const onMaskPassword = useCallback((): void => {
        setIsMasked((isMasked) => !isMasked);
    }, []);

    const placeholderGenerator = (): string => {
        return isPassword ? '\u2022'.repeat(6) : placeholder;
    };

    const textAreaStyles =
        'bg-primary text-primary placeholder:text-lm-grey-200 disabled:text-lm-grey-300 h-15 w-full rounded-lg p-4 focus:border focus:border-buttonPrimary focus:outline-none overflow-hidden resize-none';

    const inputStyles = getValidClassNames(
        'bg-primary text-primary placeholder:text-lm-grey-200 focus:border-buttonPrimary disabled:text-lm-grey-300 h-9 w-full rounded-lg p-4 focus:border focus:outline-none',
        hasError && 'border-lm-red border',
        isPassword && 'pr-8',
    );

    return (
        <label
            className={getValidClassNames(
                className,
                'text-primary flex max-h-20 flex-col text-sm',
            )}
        >
            <span
                className={getValidClassNames(
                    'mb-[0.5rem] font-medium',
                    hasVisuallyHiddenLabel && 'visually-hidden',
                )}
            >
                {label} {required && <span className="text-lm-red">*</span>}
            </span>
            <div className="relative">
                {isTextArea ? (
                    <textarea
                        className={textAreaStyles}
                        {...field}
                        placeholder={placeholder}
                        rows={rows}
                        autoComplete="off"
                        disabled={isDisabled}
                    />
                ) : (
                    <input
                        {...field}
                        type={isMasked ? 'text' : type}
                        placeholder={placeholderGenerator()}
                        autoComplete="off"
                        disabled={isDisabled}
                        className={inputStyles}
                        onFocus={onFocus}
                    />
                )}
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
                <ErrorMessageWithHint errorMessage={error as string} />
            )}
        </label>
    );
};

export { Input };
