import { type ReactNode } from 'react';

import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

const ButtonVariant = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
} as const;

type ButtonSize = Exclude<
    ValueOf<typeof ComponentSize>,
    typeof ComponentSize.EXTRA_LARGE
>;

type ButtonType = 'button' | 'submit';

type ButtonProperties = {
    size: ButtonSize;
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
        'rounded-lg bg-buttonSecondary text-buttonPrimary hover:bg-buttonTertiary  disabled:bg-buttonQuaternary',
    [ButtonVariant.SECONDARY]:
        'border border-buttonSecondary rounded-lg bg-transparent text-buttonSecondary hover:text-buttonTertiary hover:border-buttonTertiary disabled:text-buttonQuaternary disabled:border-buttonQuaternary',
    [ButtonVariant.TERTIARY]:
        'bg-transparent text-buttonSecondary hover:text-buttonTertiary hover:border-buttonTertiary disabled:text-buttonQuaternary',
};

const buttonSizesToClasses: Record<ButtonSize, string> = {
    [ComponentSize.SMALL]: 'px-4 py-2 h-8 text-sm font-bold gap-1',
    [ComponentSize.MEDIUM]: 'px-6 py-4 h-14 text-sm font-bold gap-2',
    [ComponentSize.LARGE]: 'px-8 py-6 h-20 text-xl font-bold gap-3',
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

export { Button, ButtonVariant };
