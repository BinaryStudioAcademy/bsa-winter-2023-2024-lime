import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

import { Avatar, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

import styles from './styles.module.css';

type Properties = {
    email: string;
    avatarUrl?: string;
};

const Navigation = ({ email, avatarUrl }: Properties): JSX.Element => {
    return (
        <nav className={styles['navigation']}>
            <ul className={styles['menu-list']}>
                <li>
                    <Link to={AppRoute.ROOT}>
                        <BellIcon className={styles['icon']} />
                    </Link>
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
                        avatarUrl={avatarUrl || ''}
                    />
                </li>
            </ul>
        </nav>
    );
};

export { Navigation };
