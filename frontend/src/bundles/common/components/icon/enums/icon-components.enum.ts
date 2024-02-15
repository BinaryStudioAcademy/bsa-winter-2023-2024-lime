import ArrowDownIcon from '~/assets/img/icons/arrow-down-icon.svg?react';
import LogoIcon from '~/assets/img/icons/logo-icon.svg?react';

import { type IconName } from '../types/icon.type.js';

const IconComponent: Record<
    IconName,
    React.FC<React.SVGProps<SVGSVGElement>>
> = {
    arrowDown: ArrowDownIcon,
    logoIcon: LogoIcon,
} as const;

export { IconComponent };
