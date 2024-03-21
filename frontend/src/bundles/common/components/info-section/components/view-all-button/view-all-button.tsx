import { ChevronRightIcon } from '@heroicons/react/24/solid';

import { Link } from '~/bundles/common/components/components.js';
import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    to: ValueOf<typeof AppRoute>;
    title?: string | undefined;
};

const ViewAllButton: React.FC<Properties> = ({ to, title }) => {
    return (
        <Link to={to} className="flex items-center gap-1">
            <span className="text-action text-sm font-semibold leading-4">
                {title ?? 'View All'}
            </span>
            <ChevronRightIcon className="text-action h-3 w-3" />
        </Link>
    );
};

export { ViewAllButton };
