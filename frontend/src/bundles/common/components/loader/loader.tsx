import { type Color, type Size } from '~/bundles/common/types/types.js';

import { LogoIcon } from '../icons/icons.js';

type Properties = {
    isOverflow?: boolean;
    color?: Color;
    size?: Size;
};

const Loader: React.FC<Properties> = ({
    isOverflow,
    color = 'primary',
    size = 'lg',
}: Properties): JSX.Element => {
    const spinner = (
        <>
            <span aria-hidden="true">
                <LogoIcon color={color} size={size} className="animate-load" />
            </span>
            <span className="sr-only">Loading...</span>
        </>
    );

    return isOverflow ? (
        <div className="absolute flex h-full w-full items-center justify-center">
            {spinner}
        </div>
    ) : (
        spinner
    );
};

export { Loader };
