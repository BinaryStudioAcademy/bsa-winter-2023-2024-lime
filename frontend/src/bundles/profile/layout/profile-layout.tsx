import { RouterOutlet } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

import { ProfileNavigation } from '../components/components.js';

type Properties = {
    children?: ReactNode;
    className?: string;
};

const ProfileLayout = ({ className }: Properties): JSX.Element => (
    <div
        className={getValidClassNames(
            className,
            'mx-auto my-0 flex h-full w-full p-0',
        )}
    >
        <ProfileNavigation />
        <RouterOutlet />
    </div>
);

export { ProfileLayout };
