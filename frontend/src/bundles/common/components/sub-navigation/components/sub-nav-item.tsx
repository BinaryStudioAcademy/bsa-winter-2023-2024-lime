import { NavLink } from 'react-router-dom';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    label: string;
    to: string;
    isActive: boolean;
    bgColor: string;
};

const SubNavItem = ({
    label,
    to,
    isActive,
    bgColor,
}: Properties): JSX.Element => {
    const labelStyles = {
        base: 'text-sm text-left font-bold truncate leading-6 select-none ml-[2.25rem]',
        color: isActive ? 'text-white' : 'text-lm-grey-400',
    };
    const circleStyles = {
        base: 'outline-lm-blue-400 absolute left-[0.875rem] top-1/2 h-[1.25rem] w-[1.25rem] rounded-full [transform:translate(-50%,-50%)]',
        border: 'border border-[0.188rem] ring',
        color: isActive
            ? 'bg-lm-yellow-100 ring-white border-white'
            : `${bgColor} ring-lm-blue-400 border-lm-blue-500`,
    };

    return (
        <NavLink to={to} className="relative">
            <span
                className={getValidClassNames(
                    circleStyles.base,
                    circleStyles.border,
                    circleStyles.color,
                )}
            ></span>
            <p
                className={getValidClassNames(
                    labelStyles.base,
                    labelStyles.color,
                )}
            >
                {label}
            </p>
        </NavLink>
    );
};

export { SubNavItem };
