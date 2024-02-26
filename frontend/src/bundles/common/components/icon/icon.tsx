import { type ValueOf } from 'shared/src/types/types.js';

import { type ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { type IconColor, type IconName } from './enums/enums.js';
import { IconComponent } from './enums/icon-components.enum.js';
import { sizeToClass } from './helpers/helpers.js';

type Properties = {
    name: ValueOf<typeof IconName>;
    color?: ValueOf<typeof IconColor>;
    size?: ValueOf<typeof ComponentSize>;
    className?: string;
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
