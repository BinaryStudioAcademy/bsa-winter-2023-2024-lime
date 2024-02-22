import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { ActivityBackground, ActivityVariantIcon } from './enums/enums.js';

type Properties = {
    activity: string;
    size: string;
    className?: string;
};

const baseClass = 'text-white p-3';

const ActivitySizeToClasses: Record<string, string> = {
    [ComponentSize.MEDIUM]: 'h-[45px] w-[45px] rounded',
    [ComponentSize.LARGE]: 'h-[50px] w-[50px] rounded-full',
};

const ActivityIcon = ({
    activity,
    size,
    className = '',
}: Properties): JSX.Element => {
    const Component = ActivityVariantIcon[activity] as React.FC<
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
            <Component className="h-full w-full fill-white" />
        </div>
    );
};

export { ActivityIcon };
