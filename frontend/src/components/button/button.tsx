import { type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium';
type ButtonType = 'button' | 'submit';

type ButtonProperties = {
    children: ReactNode;
    size: ButtonSize;
    variant: ButtonVariant;
    type?: ButtonType;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
};

const classCreator = (input: string): string =>
    input
        .replaceAll(/\s+/gm, ' ')
        .split(' ')
        .filter((item) => typeof item === 'string')
        .join(' ')
        .trim();

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
    disabled = false,
    ...properties
}: ButtonProperties): JSX.Element => {
    return (
        <button
            disabled={disabled}
            type={type}
            className={classCreator(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${className}
            `)}
            {...properties}
        >
            {children}
        </button>
    );
};

export { Button };
