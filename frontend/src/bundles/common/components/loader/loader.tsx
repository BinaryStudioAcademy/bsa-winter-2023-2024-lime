import {
    LogoIcon,
    LogoIconColor,
    LogoIconSize,
} from '~/bundles/common/components/icons/icons.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    isOverflow?: boolean;
    color?: ValueOf<typeof LogoIconColor>;
    size?: ValueOf<typeof LogoIconSize>;
};

const Loader: React.FC<Properties> = ({
    isOverflow,
    color = LogoIconColor.PRIMARY,
    size = LogoIconSize.LARGE,
}: Properties): JSX.Element => {
    const spinner = (
        <>
            <span aria-hidden="true">
                <LogoIcon color={color} size={size} className="animate-load" />
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
