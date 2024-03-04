import CyclingIcon from '~/assets/img/icons/activities/cycling.svg?react';
import RunningIcon from '~/assets/img/icons/activities/running.svg?react';
import WalkingIcon from '~/assets/img/icons/activities/walking.svg?react';
import ArrowDownIcon from '~/assets/img/icons/arrow-down-icon.svg?react';
import CaloriesIcon from '~/assets/img/icons/calories-icon.svg?react';
import FacebookIcon from '~/assets/img/icons/facebook.svg?react';
import GoalsIcon from '~/assets/img/icons/goals-icon.svg?react';
import GoogleFitIcon from '~/assets/img/icons/google-fit-icon.svg?react';
import GoogleLogoIcon from '~/assets/img/icons/google-logo.svg?react';
import LogoIcon from '~/assets/img/icons/logo-icon.svg?react';
import NotFoundIcon from '~/assets/img/icons/not-found-icon.svg?react';
import StepsIcon from '~/assets/img/icons/steps-icon.svg?react';
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
    caloriesIcon: CaloriesIcon,
    stepsIcon: StepsIcon,
    googleLogoIcon: GoogleLogoIcon,
    facebookIcon: FacebookIcon,
    cyclingIcon: CyclingIcon,
    walkingIcon: WalkingIcon,
    runningIcon: RunningIcon,
} as const;

export { IconComponent };
