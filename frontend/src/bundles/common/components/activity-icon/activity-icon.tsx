import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { ActivityBackground, ActivityVariantIcon } from './enums/enums.js';

type Properties = {
    activity: string;
    size: string;
    className?: string;
};

const baseClass = 'text-white p-2';

const ActivitySizeToClasses: Record<string, string> = {
    [ComponentSize.SMALL]: 'h-9 w-9 rounded-full',
    [ComponentSize.MEDIUM]: 'h-11 w-11 rounded',
    [ComponentSize.LARGE]: 'h-12 w-12 rounded-full',
};

const ActivityIcon = ({
    activity,
    size,
    className = '',
}: Properties): JSX.Element => {
    const IconComponent = ActivityVariantIcon[activity] as React.FC<
        React.SVGProps<SVGSVGElement>
    >;
    return (
        <div
            className={getValidClassNames(
                baseClass,
                ActivityBackground[activity],
                ActivitySizeToClasses[size],
                className,
            )}
        >
            <IconComponent className="h-full w-full fill-white" />
        </div>
    );
};

export { ActivityIcon };
