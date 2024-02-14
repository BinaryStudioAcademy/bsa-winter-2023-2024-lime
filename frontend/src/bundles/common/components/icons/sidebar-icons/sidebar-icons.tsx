import { CalendarDaysIcon } from '@heroicons/react/16/solid';
import {
    ArrowLeftStartOnRectangleIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const ICON_CLASSNAME = 'inline h-8 w-8 flex justify-center items-center';

const OverviewIcon = (): JSX.Element => {
    return (
        <svg
            className={ICON_CLASSNAME}
            viewBox="0 0 30 18"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.06 3.32771V3.33V5.23C8.06 6.23613 7.79557 6.92232 7.35895 7.35895C6.92232 7.79557 6.23613 8.06 5.23 8.06H3.33C2.32387 8.06 1.63768 7.79557 1.20105 7.35895C0.764427 6.92232 0.5 6.23613 0.5 5.23V3.33C0.5 2.32387 0.764412 1.63797 1.20191 1.20145C1.63959 0.764743 2.32828 0.5 3.34 0.5H5.24C6.24631 0.5 6.93213 0.764509 7.3673 1.20066C7.80228 1.63661 8.06462 2.322 8.06 3.32771ZM8.06 14.7677V14.77V16.67C8.06 17.6761 7.79557 18.3623 7.35895 18.7989C6.92232 19.2356 6.23613 19.5 5.23 19.5H3.33C2.32387 19.5 1.63797 19.2356 1.20145 18.7981C0.764743 18.3604 0.5 17.6717 0.5 16.66V14.76C0.5 13.7539 0.764412 13.068 1.20191 12.6314C1.63959 12.1947 2.32828 11.93 3.34 11.93H5.24C6.24631 11.93 6.93184 12.1945 7.36691 12.6315C7.80196 13.0685 8.06462 13.7564 8.06 14.7677ZM14.77 0.5H16.67C17.6761 0.5 18.3623 0.764427 18.7989 1.20105C19.2356 1.63768 19.5 2.32387 19.5 3.33V5.23C19.5 6.23613 19.2356 6.92232 18.7989 7.35895C18.3623 7.79557 17.6761 8.06 16.67 8.06H14.77C13.7639 8.06 13.0777 7.79557 12.6411 7.35895C12.2044 6.92232 11.94 6.23613 11.94 5.23V3.33C11.94 2.32387 12.2044 1.63768 12.6411 1.20105C13.0777 0.764427 13.7639 0.5 14.77 0.5ZM14.77 11.93H16.67C17.6761 11.93 18.3623 12.1944 18.7989 12.6311C19.2356 13.0677 19.5 13.7539 19.5 14.76V16.66C19.5 17.6661 19.2356 18.3523 18.7989 18.7889C18.3623 19.2256 17.6761 19.49 16.67 19.49H14.77C13.7639 19.49 13.0777 19.2256 12.6411 18.7889C12.2044 18.3523 11.94 17.6661 11.94 16.66V14.76C11.94 13.7539 12.2044 13.0677 12.6411 12.6311C13.0777 12.1944 13.7639 11.93 14.77 11.93Z"
                fill="currentColor"
            />
        </svg>
    );
};

const WorkoutIcon = (): JSX.Element => {
    return (
        <svg
            className={ICON_CLASSNAME}
            viewBox="0 0 30 18"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.82 7H14.18M22.5 9.5V4.5M1.5 9.5V4.5M17.18 13C19.58 13 20.18 11.65 20.18 10V4C20.18 2.35 19.58 1 17.18 1C14.78 1 14.18 2.35 14.18 4V10C14.18 11.65 14.78 13 17.18 13ZM6.82 13C4.42 13 3.82 11.65 3.82 10V4C3.82 2.35 4.42 1 6.82 1C9.22 1 9.82 2.35 9.82 4V10C9.82 11.65 9.22 13 6.82 13Z"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const GoalsIcon = (): JSX.Element => {
    return (
        <svg
            className={ICON_CLASSNAME}
            viewBox="0 0 30 18"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.26001 11.02V15.99C4.26001 17.81 4.26001 17.81 5.98001 18.97L10.71 21.7C11.42 22.11 12.58 22.11 13.29 21.7L18.02 18.97C19.74 17.81 19.74 17.81 19.74 15.99V11.02C19.74 9.2 19.74 9.2 18.02 8.04L13.29 5.31C12.58 4.9 11.42 4.9 10.71 5.31L5.98001 8.04C4.26001 9.2 4.26001 9.2 4.26001 11.02Z"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.5 7.63V5C17.5 3 16.5 2 14.5 2H9.5C7.5 2 6.5 3 6.5 5V7.56M12.63 10.99L13.2 11.88C13.29 12.02 13.49 12.16 13.64 12.2L14.66 12.46C15.29 12.62 15.46 13.16 15.05 13.66L14.38 14.47C14.28 14.6 14.2 14.83 14.21 14.99L14.27 16.04C14.31 16.69 13.85 17.02 13.25 16.78L12.27 16.39C12.0916 16.33 11.8984 16.33 11.72 16.39L10.74 16.78C10.14 17.02 9.68 16.68 9.72 16.04L9.78 14.99C9.79 14.83 9.71 14.59 9.61 14.47L8.94 13.66C8.53 13.16 8.7 12.62 9.33 12.46L10.35 12.2C10.51 12.16 10.71 12.01 10.79 11.88L11.36 10.99C11.72 10.45 12.28 10.45 12.63 10.99Z"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const ScheduleIcon = (): JSX.Element => {
    return <CalendarDaysIcon className={ICON_CLASSNAME} />;
};

const HelpIcon = (): JSX.Element => {
    return <QuestionMarkCircleIcon className={ICON_CLASSNAME} />;
};

const LogoutIcon = (): JSX.Element => {
    return <ArrowLeftStartOnRectangleIcon className={ICON_CLASSNAME} />;
};

export {
    GoalsIcon,
    HelpIcon,
    LogoutIcon,
    OverviewIcon,
    ScheduleIcon,
    WorkoutIcon,
};
