import { Cog6ToothIcon } from '@heroicons/react/24/solid';

import defaultAvatar from '~/assets/img/default-avatar.svg';
import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

import { NotificationComponent } from '../notifications/notification-component.js';
import styles from './styles.module.css';

type Properties = {
    avatarUrl?: string;
};

const Navigation = ({ avatarUrl }: Properties): JSX.Element => {
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
                    <img
                        src={avatarUrl ?? defaultAvatar}
                        alt="avatar"
                        className={styles['avatar']}
                    />
                </li>
            </ul>
        </nav>
    );
};

export { Navigation };
