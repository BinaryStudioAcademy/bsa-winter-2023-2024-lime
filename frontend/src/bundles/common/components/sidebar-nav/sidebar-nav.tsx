import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, ButtonSize, ButtonVariant } from '../components.js';

interface SidebarNavProperties {
    icon: JSX.Element;
    text: string;
    to: string;
}

const SidebarNav: React.FC<SidebarNavProperties> = ({ icon, text, to }) => {
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
                size={ButtonSize.MEDIUM}                
            />
        </Link>
    );
};

export { SidebarNav };
