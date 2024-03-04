import {
    activityIconBackground,
    activityIconSizeToClasses,
    activityToIconName,
} from '~/bundles/common/components/activity-icon/helpers/helpers.js';
import { type ActivityIconSize } from '~/bundles/common/components/activity-icon/types/types.js';
import { Icon } from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

type Properties = {
    activityType: ValueOf<typeof ActivityType>;
    size: ActivityIconSize;
    className?: string;
};

const baseClass = 'text-white flex items-center justify-center';

const ActivityIcon = ({
    activityType,
    size,
    className = '',
}: Properties): JSX.Element => {
    return (
        <div
            className={getValidClassNames(
                baseClass,
                activityIconBackground[activityType],
                activityIconSizeToClasses[size],
                className,
            )}
        >
            <Icon
                name={activityToIconName[activityType]}
                size={ComponentSize.SMALL}
                color={IconColor.WHITE}
            />
        </div>
    );
};

export { ActivityIcon };
