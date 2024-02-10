import { clsx } from 'clsx';
import { type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium';
type ButtonType = 'button' | 'submit';

type ButtonProperties = {
    children: ReactNode;
    size: ButtonSize;
    variant: ButtonVariant;
    type?: ButtonType;
    isDisabled?: boolean;
    className?: string;
    onClick?: () => void;
};

const classes = {
    base: 'flex justify-center items-center transition ease-in-out duration-300',
    size: {
        small: 'px-4 py-2 h-[32px] text-[14px] font-bold leading-[1.3rem]',
        medium: 'px-6 py-4 h-[54px] text-[16px] font-bold leading-[1.3rem]',
    },

    variant: {
        primary:
            'bg-transparent text-lm-yellow-100 hover:text-lm-yellow-200 disabled:text-lm-grey-300',
        secondary:
            'border border-lm-yellow-100 rounded-lg bg-transparent text-lm-yellow-100 hover:text-lm-yellow-200 hover:border-lm-yellow-200 disabled:text-lm-grey-300 disabled:border-lm-grey-300',
        tertiary:
            'rounded-lg bg-lm-yellow-100 text-lm-black-300 hover:bg-lm-yellow-200 disabled:text-lm-grey-200 disabled:bg-lm-grey-300',
    },
};

const Button = ({
    children,
    variant,
    size,
    className,
    type = 'button',
    isDisabled = false,
    ...properties
}: ButtonProperties): JSX.Element => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            className={clsx(
                classes.base,
                classes.size[size],
                classes.variant[variant],
                className,
            )}
            {...properties}
        >
            {children}
        </button>
    );
};

export { Button };
