import Cycling from '~/assets/img/icons/activities/cycling.svg?react';
import Running from '~/assets/img/icons/activities/running.svg?react';
import Walking from '~/assets/img/icons/activities/walking.svg?react';
import { Activity } from '~/bundles/goals/enums/enums.js';

const ActivityVariantIcon: Record<
    string,
    React.FC<React.SVGProps<SVGSVGElement>>
> = {
    [Activity.WALKING]: Walking,
    [Activity.RUNNING]: Running,
    [Activity.CYCLING]: Cycling,
};

export { ActivityVariantIcon };
