import { IconComponent } from './enums/icon-components.enum.js';
import { type IconName } from './types/icon.type.js';

type Properties = {
    name: IconName;
    className?: string;
};

const Icon = ({ name, className }: Properties): JSX.Element => {
    const SvgIconComponent = IconComponent[name];

    return <SvgIconComponent className={className} />;
};

export { Icon };
