import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { ViewAllButton } from './components/components.js';

type Properties = {
    children: React.ReactNode;
    viewAllLink?: ValueOf<typeof AppRoute>;
    title: string;
    className?: string;
};

const InfoSection: React.FC<Properties> = ({
    children,
    className,
    title,
    viewAllLink,
}) => {
    return (
        <div className={getValidClassNames('', className)}>
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-infoSection text-xl font-extrabold leading-6">
                    {title}
                </h3>
                {viewAllLink && <ViewAllButton to={viewAllLink} />}
            </div>
            {children}
        </div>
    );
};

export { InfoSection };
