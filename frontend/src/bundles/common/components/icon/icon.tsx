import { type ValueOf } from 'shared/src/types/types.js';

import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { type IconColor } from './enums/enums.js';
import { IconComponent } from './enums/icon-components.enum.js';
import { type IconName } from './types/icon.type.js';

type Properties = {
    name: IconName;
    color?: ValueOf<typeof IconColor>;
    size?: ValueOf<typeof ComponentSize>;
    className?: string;
};

const sizeToClass: Record<ValueOf<typeof ComponentSize>, string> = {
    [ComponentSize.SMALL]: 'h-5 w-5',
    [ComponentSize.MEDIUM]: 'h-6 w-6',
    [ComponentSize.LARGE]: 'h-8 w-8',
    [ComponentSize.EXTRA_LARGE]: 'h-40 w-40',
};

const Icon = ({ name, color, size, className }: Properties): JSX.Element => {
    const SvgIconComponent = IconComponent[name];

    return (
        <SvgIconComponent
            className={getValidClassNames(
                className,
                color,
                size && sizeToClass[size],
            )}
        />
    );
};

export { Icon };
