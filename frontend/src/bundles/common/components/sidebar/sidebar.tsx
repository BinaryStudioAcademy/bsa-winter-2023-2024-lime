import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '~/assets/img/logo.svg';

import { AppRoute } from '../../enums/app-route.enum.js';
import {
    GoalsIcon,
    HelpIcon,
    LogoutIcon,
    OverviewIcon,
    ScheduleIcon,
    WorkoutIcon,
} from '../icons/sidebar-icons/sidebar-icons.js';
import { SidebarNav } from '../sidebar-nav/sidebar-nav.js';

const Sidebar: React.FC = () => {
    const { pathname } = useLocation(); // Get the current pathname

    // Example usage of useState to track active state for each route
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeRoute, setActiveRoute] = useState(pathname);
    return (
        <div className="bg-lm-black-100 flex h-screen w-72 flex-col content-center items-center p-7 text-white">
            <div className="mb-5 flex w-full">
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-40
                        "
                    />
                </Link>
            </div>
            <div className="inner h-3/4 w-full border-gray-700 ">
                <div className="flex flex-col gap-4">
                    <SidebarNav
                        icon={<OverviewIcon />}
                        text="Overview"
                        to={AppRoute.OVERVIEW}
                        isActive={activeRoute === AppRoute.OVERVIEW}
                    />
                    <SidebarNav
                        icon={<WorkoutIcon />}
                        text="Workout"
                        to={AppRoute.WORKOUT}
                        isActive={activeRoute === AppRoute.WORKOUT}
                    />
                    <SidebarNav
                        icon={<GoalsIcon />}
                        text="Goals"
                        to={AppRoute.GOALS}
                        isActive={activeRoute === AppRoute.GOALS}
                    />
                    <SidebarNav
                        icon={<ScheduleIcon />}
                        text="Schedule"
                        to={AppRoute.SCHEDULE}
                        isActive={activeRoute === AppRoute.SCHEDULE}
                    />
                </div>
            </div>

            <div className="h-1/4 w-full flex">
                <div className="flex flex-col justify-center w-full gap-3">
                    <SidebarNav
                        icon={<HelpIcon />}
                        text="Help"
                        to={AppRoute.GOALS}
                    />
                    <SidebarNav
                        icon={<LogoutIcon />}
                        text="Logout"
                        to={AppRoute.SCHEDULE}
                    />
                </div>
            </div>
        </div>
    );
};

export { Sidebar };
