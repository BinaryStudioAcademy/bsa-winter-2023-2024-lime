import ArrowDownIcon from '~/assets/img/icons/arrow-down-icon.svg?react';
import DotIcon from '~/assets/img/icons/dot-icon.svg?react';
import FacebookIcon from '~/assets/img/icons/facebook.svg?react';
import GoalsIcon from '~/assets/img/icons/goals-icon.svg?react';
import GoogleFitIcon from '~/assets/img/icons/google-fit-icon.svg?react';
import GoogleLogoIcon from '~/assets/img/icons/google-logo.svg?react';
import LogoIcon from '~/assets/img/icons/logo-icon.svg?react';
import MessageIcon from '~/assets/img/icons/message-icon.svg?react';
import NotFoundIcon from '~/assets/img/icons/not-found-icon.svg?react';
import StravaIcon from '~/assets/img/icons/strava-icon.svg?react';
import WorkoutIcon from '~/assets/img/icons/workout-icon.svg?react';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type IconName } from './enums.js';

const IconComponent: Record<
    ValueOf<typeof IconName>,
    React.FC<React.SVGProps<SVGSVGElement>>
> = {
    arrowDown: ArrowDownIcon,
    logoIcon: LogoIcon,
    notFoundIcon: NotFoundIcon,
    goalsIcon: GoalsIcon,
    workoutIcon: WorkoutIcon,
    stravaIcon: StravaIcon,
    googleFitIcon: GoogleFitIcon,
    googleLogoIcon: GoogleLogoIcon,
    facebookIcon: FacebookIcon,
    dotIcon: DotIcon,
    messageIcon: MessageIcon,
} as const;

export { IconComponent };
