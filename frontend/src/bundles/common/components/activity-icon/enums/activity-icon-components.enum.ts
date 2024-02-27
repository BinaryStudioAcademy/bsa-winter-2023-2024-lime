import Cycling from '~/assets/img/icons/activities/cycling.svg?react';
import Running from '~/assets/img/icons/activities/running.svg?react';
import Walking from '~/assets/img/icons/activities/walking.svg?react';
import { ActivityType } from '~/bundles/goals/enums/enums.js';

const ActivityVariantIcon: Record<
    string,
    React.FC<React.SVGProps<SVGSVGElement>>
> = {
    [ActivityType.WALKING]: Walking,
    [ActivityType.RUNNING]: Running,
    [ActivityType.CYCLING]: Cycling,
};

export { ActivityVariantIcon };
