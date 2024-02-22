import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { Button, ButtonVariant, Link } from '../../../components.js';

type SidebarNavProperties = {
    text: string;
    icon: JSX.Element;
    to: ValueOf<typeof AppRoute>;
    isActive?: boolean;
};

const SidebarNav = ({
    text,
    to,
    icon,
    isActive = false,
}: SidebarNavProperties): JSX.Element => {
    const navigate = useNavigate();
    const handleNavigation = useCallback((): void => {
        navigate(to);
    }, [navigate, to]);

    const classes = {
        active: 'text-lm-black-100 hover:text-lm-black-200',
        inactive: 'text-lm-grey-200 hover:text-lm-black-400',
    };

    return (
        <Link to={to} className="flex items-center justify-center">
            <Button
                type="button"
                label={text}
                className={getValidClassNames(isActive ? classes.active : classes.inactive)}
                leftIcon={icon}
                variant={ButtonVariant.SIDEBAR}
                onClick={handleNavigation}
                isActive={isActive}
                size={'md'}
            />
        </Link>
    );
};

export { SidebarNav };
