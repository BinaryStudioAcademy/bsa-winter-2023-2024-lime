import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

import defaultAvatar from '~/assets/img/default-avatar.svg';
import { Link } from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

type Properties = {
    avatarUrl: string | null;
};

const Navigation = ({ avatarUrl }: Properties): JSX.Element => {
    return (
        <nav className={styles['navigation']}>
            <ul className={styles['menu-list']}>
                <li>
                    <Link to={'/'}>
                        <BellIcon className={styles['icon']} />
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <Cog6ToothIcon className={styles['icon']} />
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <img
                            src={avatarUrl ?? defaultAvatar}
                            alt="avatar"
                            className={styles['avatar']}
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export { Navigation };
