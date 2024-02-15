import { Icon } from '~/bundles/common/components/components.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

const LogoIconColor = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
} as const;

const LogoIconSize = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
} as const;

type Properties = {
    color: ValueOf<typeof LogoIconColor>;
    size: ValueOf<typeof LogoIconSize>;
    className?: string;
};

const colorToClass: Record<ValueOf<typeof LogoIconColor>, string> = {
    [LogoIconColor.PRIMARY]: 'text-lm-yellow-100',
    [LogoIconColor.SECONDARY]: 'text-lm-grey-200',
};

const sizeToClass: Record<ValueOf<typeof LogoIconSize>, string> = {
    [LogoIconSize.SMALL]: 'h-5 w-5',
    [LogoIconSize.MEDIUM]: 'h-6 w-6',
    [LogoIconSize.LARGE]: 'h-8 w-8',
};

const LogoIcon = ({ color, size, className = '' }: Properties): JSX.Element => {
    return (
        <Icon
            name={'logoIcon'}
            className={`inline ${colorToClass[color]} ${sizeToClass[size]} ${className}`}
        />
    );
};

export { LogoIcon, LogoIconColor, LogoIconSize };
