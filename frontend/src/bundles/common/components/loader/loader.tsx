import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { Icon } from '../components.js';
import { IconColor, IconSize } from '../icon/enums/enums.js';

type Properties = {
    isOverflow?: boolean;
    color?: ValueOf<typeof IconColor>;
    size?: ValueOf<typeof IconSize>;
};

const Loader: React.FC<Properties> = ({
    isOverflow,
    color = IconColor.PRIMARY,
    size = IconSize.LARGE,
}: Properties): JSX.Element => {
    const spinner = (
        <>
            <span aria-hidden="true">
                <Icon
                    name="logoIcon"
                    color={color}
                    size={size}
                    className="animate-load"
                />
            </span>
            <span className="sr-only">Loading...</span>
        </>
    );
    const classNames = isOverflow
        ? 'absolute flex h-full w-full items-center justify-center'
        : 'inline';

    return <div className={getValidClassNames(classNames)}>{spinner}</div>;
};

export { Loader };
