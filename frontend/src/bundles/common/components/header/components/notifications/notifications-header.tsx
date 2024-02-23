import { BellIcon } from '@heroicons/react/24/solid';

type Properties = {
    count: number;
    onClick: () => void;
};

const NotificationIcon = ({ count, onClick }: Properties): JSX.Element => {
    return (
        <button
            className="relative flex items-center justify-center"
            onClick={onClick}
        >
            <BellIcon className="text-lm-grey-200 w-8 sm:w-6" />
            <span className="bg-lm-yellow-100 absolute -right-1 -top-2 flex h-full max-h-4 w-full max-w-4 items-center justify-center rounded-full text-xs font-extrabold">
                {count}
            </span>
        </button>
    );
};

export { NotificationIcon };
