import ArrowDownIcon from '~/assets/img/icons/arrow-down-icon.svg?react';
import LogoIcon from '~/assets/img/icons/logo-icon.svg?react';
import MoonIcon from '~/assets/img/icons/moon-icon.svg?react';
import NotFoundIcon from '~/assets/img/icons/not-found-icon.svg?react';
import SunIcon from '~/assets/img/icons/sun-icon.svg?react';

import { type IconName } from '../types/icon.type.js';

const IconComponent: Record<
    IconName,
    React.FC<React.SVGProps<SVGSVGElement>>
> = {
    arrowDown: ArrowDownIcon,
    logoIcon: LogoIcon,
    notFoundIcon: NotFoundIcon,
    moonIcon: MoonIcon,
    sunIcon: SunIcon,
} as const;

export { IconComponent };
