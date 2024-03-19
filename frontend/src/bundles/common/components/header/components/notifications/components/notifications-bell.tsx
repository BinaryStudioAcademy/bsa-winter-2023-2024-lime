import { BellIcon } from '@heroicons/react/24/solid';

import { Loader } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    count: number;
    onClick: () => void;
    loading: boolean;
    showList: boolean;
};

const NotificationBell = ({
    count,
    onClick,
    loading,
    showList,
}: Properties): JSX.Element => {
    const animate = count > 0 && !showList;

    return (
        <button
            className={getValidClassNames(
                'relative flex items-center justify-center',
                animate ? 'animate-pulse' : '',
            )}
            onClick={onClick}
        >
            <BellIcon
                className={getValidClassNames(
                    'text-lm-grey-200 w-8 transform transition-all duration-300 ease-in-out sm:w-6',
                    showList ? 'rotate-12 scale-110' : '',
                )}
            />
            {count > 0 && (
                <span
                    className={getValidClassNames(
                        'bg-lm-yellow-100 absolute -right-1 -top-2 flex h-full max-h-4 w-full max-w-4 items-center justify-center rounded-full text-xs font-extrabold transition-all ',
                        showList ? 'bg-lm-yellow-200 -right-0 -top-2' : '',
                    )}
                >
                    {loading ? <Loader size="sm" /> : count}
                </span>
            )}
        </button>
    );
};

export { NotificationBell };
