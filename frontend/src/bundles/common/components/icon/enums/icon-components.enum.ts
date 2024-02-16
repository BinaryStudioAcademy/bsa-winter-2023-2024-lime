import ArrowDownIcon from '~/assets/img/icons/arrow-down-icon.svg?react';
import ScheduleIcon from '~/assets/img/icons/calendar-days-icon.svg?react';
import GoalsIcon from '~/assets/img/icons/goals-icon.svg?react';
import HelpIcon from '~/assets/img/icons/help-icon.svg?react';
import LogoIcon from '~/assets/img/icons/logo-icon.svg?react';
import LogoutIcon from '~/assets/img/icons/logoutIcon.svg?react';
import NotFoundIcon from '~/assets/img/icons/not-found-icon.svg?react';
import OverviewIcon from '~/assets/img/icons/overview-icon.svg?react';
import WorkoutIcon from '~/assets/img/icons/workout-icon.svg?react';

import { type IconName } from '../types/icon.type.js';

const IconComponent: Record<
    IconName,
    React.FC<React.SVGProps<SVGSVGElement>>
> = {
    arrowDown: ArrowDownIcon,
    logoIcon: LogoIcon,
    notFoundIcon: NotFoundIcon,
    goalsIcon: GoalsIcon,
    overviewIcon: OverviewIcon,
    helpIcon: HelpIcon,
    logoutIcon: LogoutIcon,
    workoutIcon: WorkoutIcon,
    scheduleIcon: ScheduleIcon,
} as const;

export { IconComponent };
