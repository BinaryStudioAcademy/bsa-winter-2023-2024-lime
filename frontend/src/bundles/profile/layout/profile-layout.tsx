import { RouterOutlet } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

import { ProfileNavigation } from '../components/components.js';

type Properties = {
    children?: ReactNode;
    className?: string;
};

const ProfileLayout: React.FC<Properties> = ({ className }): JSX.Element => (
    <div className={getValidClassNames(className, 'mx-auto my-0 flex w-full')}>
        <ProfileNavigation />
        <RouterOutlet />
    </div>
);

export { ProfileLayout };
