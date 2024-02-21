import {
    useEffect,
    useLocation,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { AppRoute } from '../../enums/app-route.enum.js';
import { getValidClassNames } from '../../helpers/helpers.js';
import { Icon } from '../components.js';
import {
    HelpIcon,
    LogoutIcon,
    OverviewIcon,
    ScheduleIcon,
} from '../icon/enums/icon-components.enum.js';
import { sizeToClass } from '../icon/icon.js';
import { SidebarNav } from './components/sidebar-nav/sidebar-nav.js';
import { iconsSvgr } from './enums/enums.js';

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
                        icon={<OverviewIcon className={sizeToClass['lg']} />}
                        text="Overview"
                        to={AppRoute.OVERVIEW}
                        isActive={activeRoute === AppRoute.OVERVIEW}
                    />
                    <SidebarNav
                        icon={<Icon name={iconsSvgr.WORKOUT} size={'lg'} />}
                        text="Workout"
                        to={AppRoute.WORKOUT}
                        isActive={activeRoute === AppRoute.WORKOUT}
                    />
                    <SidebarNav
                        icon={<Icon name={iconsSvgr.GOALS} size={'lg'} />}
                        text="Goals"
                        to={AppRoute.GOALS}
                        isActive={activeRoute === AppRoute.GOALS}
                    />
                    <SidebarNav
                        icon={<ScheduleIcon className={sizeToClass['lg']} />}
                        text="My schedule"
                        to={AppRoute.SCHEDULE}
                        isActive={activeRoute === AppRoute.SCHEDULE}
                    />
                </div>
            </div>

            <div className="flex h-1/4 w-full">
                <div className="flex w-full flex-col justify-center gap-3">
                    <SidebarNav
                        icon={<HelpIcon className={sizeToClass['lg']} />}
                        text="Help"
                        to={AppRoute.HELP}
                        isActive={activeRoute === AppRoute.HELP}
                    />
                    <SidebarNav
                        icon={<LogoutIcon className={sizeToClass['lg']} />}
                        text="Logout"
                        to={AppRoute.LOGOUT}
                    />
                </div>
            </div>
        </div>
    );
};

export { Sidebar };
