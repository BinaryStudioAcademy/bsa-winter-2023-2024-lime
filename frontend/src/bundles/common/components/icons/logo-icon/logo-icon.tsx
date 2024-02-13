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
        <svg
            className={`inline ${colorToClass[color]} ${sizeToClass[size]} ${className}`}
            viewBox="0 0 30 18"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21.9067 0C19.6267 0 16.9067 0.866667 16.9067 5V13C16.9067 17.1333 19.6267 18 21.9067 18C24.1867 18 26.9067 17.1333 26.9067 13V5C26.9067 0.866667 24.1867 0 21.9067 0ZM8.09333 0C5.81333 0 3.09333 0.866667 3.09333 5V13C3.09333 17.1333 5.81333 18 8.09333 18C10.3733 18 13.0933 17.1333 13.0933 13V5C13.0933 0.866667 10.3733 0 8.09333 0ZM16.9067 8H13.0933V10H16.9067V8ZM29 13.3333C28.4533 13.3333 28 12.88 28 12.3333V5.66667C28 5.12 28.4533 4.66667 29 4.66667C29.5467 4.66667 30 5.12 30 5.66667V12.3333C30 12.88 29.5467 13.3333 29 13.3333ZM1 13.3333C0.453333 13.3333 0 12.88 0 12.3333V5.66667C0 5.12 0.453333 4.66667 1 4.66667C1.54667 4.66667 2 5.12 2 5.66667V12.3333C2 12.88 1.54667 13.3333 1 13.3333Z"
                fill="currentColor"
            />
        </svg>
    );
};

export { LogoIcon, LogoIconColor, LogoIconSize };
