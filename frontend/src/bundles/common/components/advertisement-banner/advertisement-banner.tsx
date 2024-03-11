import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    className?: string;
};

const AdvertisementBanner: React.FC<Properties> = ({ className }) => {
    return (
        <div
            className={getValidClassNames(
                'flex items-center justify-center',
                className,
            )}
        >
            ADS
        </div>
    );
};

export { AdvertisementBanner };
