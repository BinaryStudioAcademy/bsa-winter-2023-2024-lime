import { type ReactNode } from 'react';

import { getValidClassNames } from '../../helpers/helpers.js';

type Properties = {
    children: ReactNode;
    className?: string;
};

const Layout = ({ children, className }: Properties): JSX.Element => (
    <div className={getValidClassNames(className, 'mx-auto my-0 w-full p-7')}>
        {children}
    </div>
);

export { Layout };
