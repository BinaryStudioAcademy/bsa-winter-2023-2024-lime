import { Cog6ToothIcon } from '@heroicons/react/24/solid';

import { Avatar, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

import { NotificationComponent } from '../notifications/notification-component.js';
import styles from './styles.module.css';

type Properties = {
    email: string;
    avatarUrl?: string | null;
};

const Navigation: React.FC<Properties> = ({
    email,
    avatarUrl,
}): JSX.Element => {
    return (
        <nav className={styles['navigation']}>
            <ul className={styles['menu-list']}>
                <li>
                    <NotificationComponent />
                </li>
                <li>
                    <Link to={AppRoute.PROFILE_INFORMATION}>
                        <Cog6ToothIcon className={styles['icon']} />
                    </Link>
                </li>
                <li>
                    <Avatar
                        size="sm"
                        email={email}
                        avatarUrl={avatarUrl || null}
                    />
                </li>
            </ul>
        </nav>
    );
};

export { Navigation };
