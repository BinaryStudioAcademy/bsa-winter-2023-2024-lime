import ArrowDownIcon from '~/assets/img/icons/arrow-down-icon.svg?react';
import LogoIcon from '~/assets/img/icons/logo-icon.svg?react';
import NotFoundIcon from '~/assets/img/icons/not-found-icon.svg?react';
import PlusIcon from '~/assets/img/icons/plus-icon.svg?react';

import { type IconName } from '../types/icon.type.js';

const IconComponent: Record<
    IconName,
    React.FC<React.SVGProps<SVGSVGElement>>
> = {
    arrowDown: ArrowDownIcon,
    logoIcon: LogoIcon,
    notFoundIcon: NotFoundIcon,
    plus: PlusIcon,
} as const;

export { IconComponent };
