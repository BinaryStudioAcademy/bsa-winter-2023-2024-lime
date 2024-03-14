import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ReactNode, type ValueOf } from '~/bundles/common/types/types.js';

const ButtonVariant = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
    SIDEBAR: 'sidebar',
    DANGER: 'danger',
    CREATE_GOAL: 'createGoal',
} as const;

type ButtonSize = Exclude<
    ValueOf<typeof ComponentSize>,
    typeof ComponentSize.EXTRA_LARGE
>;

type ButtonType = 'button' | 'submit';

type Properties = {
    size: ButtonSize;
    variant: ValueOf<typeof ButtonVariant>;
    label: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    type?: ButtonType;
    isDisabled?: boolean;
    isActive?: boolean;
    className?: string;
    onClick?: () => void;
};

const baseClasses =
    'w-full flex items-center transition ease-in-out duration-300';

const activeClasses =
    'bg-lm-yellow-100 text-lm-black-200 hover:text-lm-black-400 hover:outline-2 hover:outline-lm-black-400 hover:outline';

const buttonVariantToClasses: Record<ValueOf<typeof ButtonVariant>, string> = {
    [ButtonVariant.PRIMARY]:
        'rounded-lg justify-center bg-buttonPrimary text-buttonText hover:bg-buttonSecondary  disabled:bg-buttonTertiary',
    [ButtonVariant.SECONDARY]:
        'border justify-center border-buttonPrimary rounded-lg bg-transparent text-buttonPrimary hover:text-buttonSecondary hover:border-buttonSecondary disabled:text-buttonTertiary disabled:border-buttonTertiary',
    [ButtonVariant.TERTIARY]:
        'bg-transparent justify-center text-buttonPrimary hover:text-buttonSecondary hover:border-buttonSecondary disabled:text-buttonTertiary',
    [ButtonVariant.SIDEBAR]:
        'align-middle hover:text-lm-black-200 hover:bg-lm-yellow-100 disabled:text-lm-grey-300 justify-start rounded-md',
    [ButtonVariant.DANGER]:
        'rounded-lg justify-center bg-lm-red text-primary hover:opacity-80',
    [ButtonVariant.CREATE_GOAL]:
        'border justify-center border-buttonPrimary rounded-lg bg-primary text-buttonPrimary hover:text-buttonSecondary hover:border-buttonSecondary disabled:text-buttonTertiary disabled:border-buttonTertiary',
};

const buttonSizesToClasses: Record<ButtonSize, string> = {
    [ComponentSize.SMALL]: 'px-4 py-2 h-8 text-sm font-bold gap-1',
    [ComponentSize.MEDIUM]: 'px-6 py-4 h-14 text-sm font-bold gap-2',
    [ComponentSize.LARGE]: 'px-8 py-6 h-20 text-xl font-bold gap-3',
};

const Button: React.FC<Properties> = ({
    label,
    variant,
    size,
    leftIcon,
    rightIcon,
    className,
    type = 'button',
    isDisabled = false,
    isActive = false,
    ...properties
}): JSX.Element => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            className={getValidClassNames(
                baseClasses,
                buttonSizesToClasses[size],
                buttonVariantToClasses[variant],
                className,
                isActive ? activeClasses : '',
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
