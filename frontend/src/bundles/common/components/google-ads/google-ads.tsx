import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    children?: React.ReactNode;
    className?: string;
};

const GoogleAds: React.FC<Properties> = ({ children, className }) => {
    return (
        <div
            className={getValidClassNames([
                'bg-primary bg-rectangle font-manrope text-24 leading-33 flex w-full flex-wrap items-center justify-center rounded-lg text-center font-extrabold text-gray-700',
                className,
            ])}
        >
            {children ?? <p className="m-2">Your advertisement may be here</p>}
        </div>
    );
};

export { GoogleAds };
