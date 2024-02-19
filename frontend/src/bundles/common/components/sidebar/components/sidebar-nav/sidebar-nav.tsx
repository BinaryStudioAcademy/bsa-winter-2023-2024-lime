import { IconSize } from '~/bundles/common/components/icon/enums/enums.js';
import { type IconName } from '~/bundles/common/components/icon/types/types.js';
import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    Button,
    ButtonSize,
    ButtonVariant,
    Icon,
    Link,
} from '../../../components.js';

type SidebarNavProperties = {
    text: string;
    icon: IconName;
    to: ValueOf<typeof AppRoute>;
    isActive?: boolean;
};

const getIcon = (name: IconName): JSX.Element => {
    return <Icon name={name} size={IconSize.LARGE} />;
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
    const iconElement = getIcon(icon);
    const classes = {
        active: 'text-lm-black-100 hover:text-lm-black-200',
        inactive: 'text-lm-grey-200 hover:text-lm-black-200',
    };
    
    return (
        <Link
            to={to}
            className={`${isActive ? classes.active : classes.inactive} flex items-center`}
        >
            <Button
                type="button"
                label={text}
                className={isActive ? classes.active : classes.inactive}
                leftIcon={iconElement}
                variant={ButtonVariant.SIDEBAR}
                onClick={handleNavigation}
                isActive={isActive}
                size={ButtonSize.MEDIUM}
            />
        </Link>
    );
};

export { SidebarNav };
