import {
    useEffect,
    useLocation,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { AppRoute } from '../../enums/app-route.enum.js';
import { getValidClassNames } from '../../helpers/helpers.js';
import { SidebarNav } from './components/sidebar-nav/sidebar-nav.js';
import { icons } from './enums/enums.js';

type Properties = {
    isOpen?: boolean;
};

const styles = {
    baseStyle:
        'bg-lm-black-100 flex h-[95vh] w-72 flex-col content-center items-center p-7 text-white',
    animationStyle: 'transition-transform duration-[0.5s] ease-[ease-in-out]',
};

const Sidebar = ({ isOpen = true }: Properties): JSX.Element => {
    const { pathname } = useLocation();

    const [activeRoute, setActiveRoute] = useState(pathname);

    const [sidebarStyle, setSidebarStyle] = useState({});

    useEffect(() => {
        setActiveRoute(pathname);
    }, [pathname]);

    useEffect(() => {
        isOpen
            ? setSidebarStyle({ transform: 'translateX(0)' })
            : setSidebarStyle({ transform: 'translateX(-100%)' });
    }, [isOpen]);

    return (
        <div
            className={getValidClassNames(
                styles.baseStyle,
                styles.animationStyle,
            )}
            style={sidebarStyle}
        >
            <div className="inner h-3/4 w-full border-gray-700 ">
                <div className="flex flex-col gap-4">
                    <SidebarNav
                        icon={icons.OVERVIEW}
                        text="Overview"
                        to={AppRoute.OVERVIEW}
                        isActive={activeRoute === AppRoute.OVERVIEW}
                    />
                    <SidebarNav
                        icon={icons.WORKOUT}
                        text="Workout"
                        to={AppRoute.WORKOUT}
                        isActive={activeRoute === AppRoute.WORKOUT}
                    />
                    <SidebarNav
                        icon={icons.GOALS}
                        text="Goals"
                        to={AppRoute.GOALS}
                        isActive={activeRoute === AppRoute.GOALS}
                    />
                    <SidebarNav
                        icon={icons.SCHEDULE}
                        text="My schedule"
                        to={AppRoute.SCHEDULE}
                        isActive={activeRoute === AppRoute.SCHEDULE}
                    />
                </div>
            </div>

            <div className="flex h-1/4 w-full">
                <div className="flex w-full flex-col justify-center gap-3">
                    <SidebarNav
                        icon={icons.HELP}
                        text="Help"
                        to={AppRoute.HELP}
                        isActive={activeRoute === AppRoute.HELP}
                    />
                    <SidebarNav
                        icon={icons.LOGOUT}
                        text="Logout"
                        to={AppRoute.LOGOUT}
                    />
                </div>
            </div>
        </div>
    );
};

export { Sidebar };
