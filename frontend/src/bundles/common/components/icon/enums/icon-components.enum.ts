import StavaButtonIcon from '~/assets/img/button-strava.svg?react';
import CyclingIcon from '~/assets/img/icons/activities/cycling.svg?react';
import RunningIcon from '~/assets/img/icons/activities/running.svg?react';
import WalkingIcon from '~/assets/img/icons/activities/walking.svg?react';
import ArrowDownIcon from '~/assets/img/icons/arrow-down-icon.svg?react';
import BellIcon from '~/assets/img/icons/bell-icon.svg?react';
import CaloriesIcon from '~/assets/img/icons/calories-icon.svg?react';
import CommunityIcon from '~/assets/img/icons/community-icon.svg?react';
import FacebookIcon from '~/assets/img/icons/facebook.svg?react';
import FeedIcon from '~/assets/img/icons/feed-icon.svg?react';
import GoalIcon from '~/assets/img/icons/goal-icon.svg?react';
import GoalsIcon from '~/assets/img/icons/goals-icon.svg?react';
import GoogleFitIcon from '~/assets/img/icons/google-fit-icon.svg?react';
import GoogleLogoIcon from '~/assets/img/icons/google-logo.svg?react';
import LogoIcon from '~/assets/img/icons/logo-icon.svg?react';
import MessageIcon from '~/assets/img/icons/message-icon.svg?react';
import NotFoundIcon from '~/assets/img/icons/not-found-icon.svg?react';
import StarIcon from '~/assets/img/icons/star-icon.svg?react';
import StepsIcon from '~/assets/img/icons/steps-icon.svg?react';
import StravaIcon from '~/assets/img/icons/strava-icon.svg?react';
import WorkoutIcon from '~/assets/img/icons/workout-icon.svg?react';
import LogoHeader from '~/assets/img/logo-header.svg?react';
import LogoHeaderLight from '~/assets/img/logo-header-light.svg?react';
import PoweredByStravaIcon from '~/assets/img/powered-by-strava.svg?react';
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
    poweredByStravaIcon: PoweredByStravaIcon,
    googleFitIcon: GoogleFitIcon,
    caloriesIcon: CaloriesIcon,
    stepsIcon: StepsIcon,
    googleLogoIcon: GoogleLogoIcon,
    facebookIcon: FacebookIcon,
    messageIcon: MessageIcon,
    cyclingIcon: CyclingIcon,
    walkingIcon: WalkingIcon,
    runningIcon: RunningIcon,
    logoHeader: LogoHeader,
    logoHeaderLight: LogoHeaderLight,
    bellIcon: BellIcon,
    communityIcon: CommunityIcon,
    feedIcon: FeedIcon,
    goalIcon: GoalIcon,
    starIcon: StarIcon,
    stavaButtonIcon: StavaButtonIcon,
} as const;

export { IconComponent };
