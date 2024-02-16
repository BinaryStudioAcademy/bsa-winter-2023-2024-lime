import { type ValueOf } from 'shared/src/types/types.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { type IconColor, type IconSize } from './enums/enums.js';
import { IconComponent } from './enums/icon-components.enum.js';
import { type IconName } from './types/icon.type.js';

type Properties = {
    name: IconName;
    color?: ValueOf<typeof IconColor>;
    size?: ValueOf<typeof IconSize>;
    className?: string;
};

const Icon = ({ name, color, size, className }: Properties): JSX.Element => {
    const SvgIconComponent = IconComponent[name];

    return (
        <SvgIconComponent
            className={getValidClassNames(className, color, size)}
        />
    );
};

export { Icon };
