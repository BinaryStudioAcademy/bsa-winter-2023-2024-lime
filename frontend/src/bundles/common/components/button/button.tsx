import { type ReactNode } from 'react';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

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
    size: (typeof ButtonSize)[keyof typeof ButtonSize];
    variant: (typeof ButtonVariant)[keyof typeof ButtonVariant];
    label: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    type?: ButtonType;
    isDisabled?: boolean;
    className?: string;
    onClick?: () => void;
};

const classes = {
    base: 'flex justify-center items-center transition ease-in-out duration-300',
    size: {
        small: 'px-4 py-2 h-[32px] text-[14px] font-bold leading-[1.3rem] gap-[4px]',
        medium: 'px-6 py-4 h-[54px] text-[16px] font-bold leading-[1.3rem] gap-[8px]',
    },

    variant: {
        primary:
            'rounded-lg bg-lm-yellow-100 text-lm-black-300 hover:bg-lm-yellow-200 disabled:text-lm-grey-200 disabled:bg-lm-grey-300',
        secondary:
            'border border-lm-yellow-100 rounded-lg bg-transparent text-lm-yellow-100 hover:text-lm-yellow-200 hover:border-lm-yellow-200 disabled:text-lm-grey-300 disabled:border-lm-grey-300',
        tertiary:
            'bg-transparent text-lm-yellow-100 hover:text-lm-yellow-200 disabled:text-lm-grey-300',
    },
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
                classes.base,
                classes.size[size],
                classes.variant[variant],
                className as string,
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
