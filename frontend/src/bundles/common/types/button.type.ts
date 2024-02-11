import { type ReactNode } from 'react';

enum ButtonVariant {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
}

enum ButtonSize {
    Small = 'small',
    Medium = 'medium',
}

type ButtonType = 'button' | 'submit';

type ButtonProperties = {
    size: ButtonSize;
    variant: ButtonVariant;
    label: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    type?: ButtonType;
    isDisabled?: boolean;
    className?: string;
    onClick?: () => void;
};

export { type ButtonProperties, ButtonSize, ButtonVariant };
