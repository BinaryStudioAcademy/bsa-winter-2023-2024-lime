import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type ActivityType } from '~/bundles/goals/enums/enums.js';

import { Icon } from '../components.js';
import { IconColor } from '../icon/enums/icon-colors.enum.js';
import { IconName } from '../icon/enums/icon-name.enum.js';
import { ActivityBackground } from './enums/enums.js';

type Properties = {
    activityType: ValueOf<typeof ActivityType>;
    size: string;
    className?: string;
};

const baseClass = 'text-white flex items-center justify-center';

const ActivitySizeToClasses: Record<string, string> = {
    [ComponentSize.SMALL]: 'h-9 w-9 rounded-full',
    [ComponentSize.MEDIUM]: 'h-11 w-11 rounded',
    [ComponentSize.LARGE]: 'h-12 w-12 rounded-full',
};

const activityToIconNameType: Record<
    ValueOf<typeof ActivityType>,
    ValueOf<typeof IconName>
> = {
    'running': IconName.runningIcon,
    'cycling': IconName.cyclingIcon,
    'walking': IconName.walkingIcon,
};

const ActivityIcon = ({
    activityType,
    size,
    className = '',
}: Properties): JSX.Element => {
    return (
        <div
            className={getValidClassNames(
                baseClass,
                ActivityBackground[activityType],
                ActivitySizeToClasses[size],
                className,
            )}
        >
            <Icon
                name={activityToIconNameType[activityType]}
                size={ComponentSize.SMALL}
                color={IconColor.WHITE}
            />
        </div>
    );
};

export { ActivityIcon };
