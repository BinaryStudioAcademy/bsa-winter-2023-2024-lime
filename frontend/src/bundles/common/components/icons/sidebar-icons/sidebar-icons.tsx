import { CalendarDaysIcon } from '@heroicons/react/16/solid';
import {
    ArrowLeftStartOnRectangleIcon,
    QuestionMarkCircleIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline';

import { Icon } from '../../components.js';
import { iconsSvgr } from '../../sidebar/enums/enums.js';

const ICON_CLASSNAME = 'inline h-8 w-8 flex justify-center items-center';

const OverviewIcon = (): JSX.Element => {
    return <Squares2X2Icon className={ICON_CLASSNAME} />;
};

const WorkoutIcon = (): JSX.Element => {
    return <Icon name={iconsSvgr.WORKOUT} size={'lg'} />;
};

const GoalsIcon = (): JSX.Element => {
    return <Icon name={iconsSvgr.GOALS} size={'lg'} />;
};

const ScheduleIcon = (): JSX.Element => {
    return <CalendarDaysIcon className={ICON_CLASSNAME} />;
};

const HelpIcon = (): JSX.Element => {
    return <QuestionMarkCircleIcon className={ICON_CLASSNAME} />;
};

const LogoutIcon = (): JSX.Element => {
    return <ArrowLeftStartOnRectangleIcon className={ICON_CLASSNAME} />;
};

export {
    GoalsIcon,
    HelpIcon,
    LogoutIcon,
    OverviewIcon,
    ScheduleIcon,
    WorkoutIcon,
};
