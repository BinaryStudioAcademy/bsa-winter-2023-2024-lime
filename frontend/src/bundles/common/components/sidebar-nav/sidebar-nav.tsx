import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { Button, ButtonSize, ButtonVariant, Link } from '../components.js';

interface SidebarNavProperties {
    icon: JSX.Element;
    text: string;
    to: ValueOf<typeof AppRoute>;
    isActive?: boolean;
}

const SidebarNav: React.FC<SidebarNavProperties> = ({
    icon,
    text,
    to,
    isActive = false,
}) => {
    const navigate = useNavigate();
    const handleNavigation = useCallback((): void => {
        navigate(to);
    }, [navigate, to]);
    return (
        <Link
            to={to}
            className="text-lm-grey-200 hover:text-lm-black-200 flex items-center"
        >
            <Button
                type="button"
                label={text}
                leftIcon={icon}
                variant={ButtonVariant.SIDEBAR}
                onClick={handleNavigation}
                isActive={isActive}
                size={ButtonSize.MEDIUM}
            />
        </Link>
    );
};

export { SidebarNav };
