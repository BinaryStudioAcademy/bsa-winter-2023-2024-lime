import { BellIcon } from '@heroicons/react/24/solid';

type Properties = {
    count: number;
    onClick: () => void;
    showList: boolean;
};

const NotificationIcon = ({
    count,
    onClick,
    showList,
}: Properties): JSX.Element => {
    const hoverClass = showList ? 'rotate-12 scale-110 text-lm-grey-500' : '';
    return (
        <button
            className="relative flex items-center justify-center"
            onClick={onClick}
        >
            <BellIcon
                className={`text-lm-grey-200 w-8 transform transition-all duration-300 ease-in-out sm:w-6 ${hoverClass}`}
            />
            {count > 0 && (
                <span className="bg-lm-yellow-100 group-hover:bg-lm-yellow-200 absolute -right-1 -top-2 flex h-full max-h-4 w-full max-w-4 items-center justify-center rounded-full text-xs font-extrabold">
                    {count}
                </span>
            )}
        </button>
    );
};

export { NotificationIcon };
