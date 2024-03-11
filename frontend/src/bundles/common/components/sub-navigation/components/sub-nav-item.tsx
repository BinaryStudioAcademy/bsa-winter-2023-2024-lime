import { NavLink } from 'react-router-dom';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    label: string;
    to: string;
    bgColor: string;
};

const SubNavItem = ({ label, to, bgColor }: Properties): JSX.Element => {
    const labelStyles = {
        base: 'text-sm text-left font-bold truncate leading-6 select-none ml-[2.25rem]',
        color: {
            active: 'text-primary',
            inactive: 'text-lm-grey-400',
        },
    };

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.currentTarget.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        },
        [],
    );

    const circleStyles = {
        base: 'outline-lm-blue-400 absolute left-[0.875rem] top-1/2 h-[1.25rem] w-[1.25rem] rounded-full [transform:translate(-50%,-50%)]',
        border: 'border border-[0.188rem] ring',
        color: {
            active: 'bg-lm-yellow-100 border-primary ring-primary',
            inactive: `${bgColor} border-inactive ring-inactive`,
        },
    };

    return (
        <NavLink to={to} className="relative" onClick={handleClick}>
            {({ isActive }) => (
                <>
                    <span
                        className={getValidClassNames(
                            circleStyles.base,
                            circleStyles.border,
                            isActive
                                ? circleStyles.color.active
                                : circleStyles.color.inactive,
                        )}
                    ></span>
                    <p
                        className={getValidClassNames(
                            labelStyles.base,
                            isActive
                                ? labelStyles.color.active
                                : labelStyles.color.inactive,
                        )}
                    >
                        {label}
                    </p>
                </>
            )}
        </NavLink>
    );
};

export { SubNavItem };
