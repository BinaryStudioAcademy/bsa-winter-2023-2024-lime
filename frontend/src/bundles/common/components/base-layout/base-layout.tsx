import { Header } from '~/bundles/common/components/header/header.js';
import { Sidebar } from '~/bundles/common/components/sidebar/sidebar.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { useAppSelector, useSidebarToggle } from '../../hooks/hooks.js';
import { GoogleAds, RouterOutlet } from '../components.js';
import styles from './styles.module.css';

type Properties = {
    children?: ReactNode;
};

const BaseLayout: React.FC<Properties> = () => {
    const { toggleSidebar, isOpen } = useSidebarToggle();

    const { currentSubscription: isSubscribed } = useAppSelector(
        ({ subscriptions }) => subscriptions,
    );

    return (
        <div
            className={getValidClassNames(
                styles['base-layout'],
                isOpen ? '' : styles['sidebar-closed'],
            )}
        >
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isOpen} />

            <div className={styles['content-container']}>
                {!isSubscribed && (
                    <GoogleAds className="hidden h-[40rem] max-w-64 flex-1 2xl:flex 2xl:text-[15px]" />
                )}
                <RouterOutlet />
                {!isSubscribed && (
                    <GoogleAds className="hidden h-[40rem] max-w-64 flex-1 2xl:flex 2xl:text-[15px]" />
                )}
            </div>
        </div>
    );
};

export { BaseLayout };
