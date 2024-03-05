import { BellIcon } from '@heroicons/react/24/solid';

type Properties = {
    count: number;
    onClick: () => void;
    showList: boolean;
};

const NotificationBell = ({
    count,
    onClick,
    showList,
}: Properties): JSX.Element => {
    return (
        <button
            className="relative flex items-center justify-center"
            onClick={onClick}
        >
            <BellIcon
                className={`text-lm-grey-200 w-8 transform transition-all duration-300 ease-in-out sm:w-6 ${showList === true ? 'rotate-12 scale-110' : ''}`}
            />
            {count > 0 && (
                <span
                    className={`bg-lm-yellow-100 absolute -right-1 -top-2 flex h-full max-h-4 w-full max-w-4 items-center justify-center rounded-full text-xs font-extrabold transition-all ${showList === true ? 'bg-lm-yellow-200 -right-0 -top-2' : ''}`}
                >
                    {count}
                </span>
            )}
        </button>
    );
};

export { NotificationBell };
