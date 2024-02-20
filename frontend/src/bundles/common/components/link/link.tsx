import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    to: ValueOf<typeof AppRoute>;
    children: React.ReactNode;
    className?: string;
};

const Link: React.FC<Properties> = ({ children, to, className }) => (
    <NavLink to={to} className={getValidClassNames(className)}>
        {children}
    </NavLink>
);

export { Link };
