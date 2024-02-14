import { Link } from 'react-router-dom';

import logo from '~/assets/img/logo.svg';

import { AppRoute } from '../../enums/app-route.enum.js';
import {
    GoalsIcon,
    OverviewIcon,
    ScheduleIcon,
    WorkoutIcon,
} from '../icons/sidebar-icons/sidebar-icons.js';
import { SidebarNav } from '../sidebar-nav/sidebar-nav.js';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-lm-black-100 flex h-screen w-72 flex-col content-center items-center p-7 text-white">
            <div className='flex w-full mb-5'>
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt="Logo"
                        className='w-40
                        '
                    />
                </Link>
            </div>
            <div className="inner h-3/4 w-full border-b border-gray-700 ">
                <div className="flex flex-col gap-4">
                    <SidebarNav
                        icon={<OverviewIcon />}
                        text="Overview"
                        to={AppRoute.OVERVIEW}
                    />
                    <SidebarNav
                        icon={<WorkoutIcon />}
                        text="Workout"
                        to={AppRoute.WORKOUT}
                    />
                    <SidebarNav
                        icon={<GoalsIcon />}
                        text="Goals"
                        to={AppRoute.GOALS}
                    />
                    <SidebarNav
                        icon={<ScheduleIcon />}
                        text="Schedule"
                        to={AppRoute.SCHEDULE}
                    />
                </div>
            </div>

            {/* Bottom rows */}
            <div className="h-1/4 w-full px-6 py-4">
                <div className="mb-4 text-lg font-semibold">Bottom Rows</div>
                <div className="flex flex-col">
                    <div className="py-2">Item 5</div>
                    <div className="py-2">Item 6</div>
                </div>
            </div>
        </div>
    );
};

export { Sidebar };
