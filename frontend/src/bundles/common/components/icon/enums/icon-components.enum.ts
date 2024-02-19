import ArrowDownIcon from '~/assets/img/icons/arrow-down-icon.svg?react';
import GoogleFitIcon from '~/assets/img/icons/google-fit-icon.svg?react';
import LogoIcon from '~/assets/img/icons/logo-icon.svg?react';
import NotFoundIcon from '~/assets/img/icons/not-found-icon.svg?react';
import StravaIcon from '~/assets/img/icons/strava-icon.svg?react';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type IconName } from './enums.js';

const IconComponent: Record<
    ValueOf<typeof IconName>,
    React.FC<React.SVGProps<SVGSVGElement>>
> = {
    arrowDown: ArrowDownIcon,
    logoIcon: LogoIcon,
    notFoundIcon: NotFoundIcon,
    stravaIcon: StravaIcon,
    googleFitIcon: GoogleFitIcon,
} as const;

export { IconComponent };
