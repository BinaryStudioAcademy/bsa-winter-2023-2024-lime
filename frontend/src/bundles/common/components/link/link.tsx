import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { getValidClassNames } from '../../helpers/helpers.js';

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
