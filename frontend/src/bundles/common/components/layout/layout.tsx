import { type ReactNode } from '~/bundles/common/types/types.js';

import { getValidClassNames } from '../../helpers/helpers.js';

type Properties = {
    children: ReactNode;
    className?: string;
};

const Layout: React.FC<Properties> = ({ children, className }): JSX.Element => (
    <div className={getValidClassNames(className, 'mx-auto my-0 w-full p-7')}>
        {children}
    </div>
);

export { Layout };
