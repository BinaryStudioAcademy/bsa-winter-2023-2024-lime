import { type ReactNode } from 'react';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

const ButtonVariant = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
} as const;

const ButtonSize = {
    SMALL: 'small',
    MEDIUM: 'medium',
} as const;

type ButtonType = 'button' | 'submit';

type ButtonProperties = {
    size: ValueOf<typeof ButtonSize>;
    variant: ValueOf<typeof ButtonVariant>;
    label: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    type?: ButtonType;
    isDisabled?: boolean;
    className?: string;
    onClick?: () => void;
};

const baseClasses =
    'w-full flex justify-center items-center transition ease-in-out duration-300';

const buttonVariantToClasses: Record<ValueOf<typeof ButtonVariant>, string> = {
    [ButtonVariant.PRIMARY]:
        'rounded-lg bg-lm-yellow-100 text-lm-black-300 hover:bg-lm-yellow-200 disabled:text-lm-grey-200 disabled:bg-lm-grey-300',
    [ButtonVariant.SECONDARY]:
        'border border-lm-yellow-100 rounded-lg bg-transparent text-lm-yellow-100 hover:text-lm-yellow-200 hover:border-lm-yellow-200 disabled:text-lm-grey-300 disabled:border-lm-grey-300',
    [ButtonVariant.TERTIARY]:
        'bg-transparent text-lm-yellow-100 hover:text-lm-yellow-200 disabled:text-lm-grey-300',
};

const buttonSizesToClasses: Record<ValueOf<typeof ButtonSize>, string> = {
    [ButtonSize.SMALL]: 'px-4 py-2 h-8 text-sm font-bold gap-1',
    [ButtonSize.MEDIUM]: 'px-6 py-4 h-14 text-sm font-bold gap-2',
};

const Button: React.FC<ButtonProperties> = ({
    label,
    variant,
    size,
    leftIcon,
    rightIcon,
    className,
    type = 'button',
    isDisabled = false,
    ...properties
}: ButtonProperties): JSX.Element => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            className={getValidClassNames(
                baseClasses,
                buttonSizesToClasses[size],
                buttonVariantToClasses[variant],
                className,
            )}
            {...properties}
        >
            {leftIcon}
            {label}
            {rightIcon}
        </button>
    );
};

export { Button, ButtonSize, ButtonVariant };
