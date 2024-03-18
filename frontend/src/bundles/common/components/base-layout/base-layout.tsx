import {
    GoogleAds,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { Header } from '~/bundles/common/components/header/header.js';
import { Sidebar } from '~/bundles/common/components/sidebar/sidebar.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppSelector,
    useSidebarToggle,
} from '~/bundles/common/hooks/hooks.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

import { SuggestionForSubscribing } from './components/suggestion-for-subscribing.js';
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
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

            <div className={styles['content-container']}>
                {!isSubscribed && (
                    <GoogleAds className="hidden h-[40rem] max-w-64 flex-1 2xl:flex 2xl:text-[15px]" />
                )}
                <RouterOutlet />
                {!isSubscribed && (
                    <GoogleAds className="hidden h-[40rem] max-w-64 flex-1 2xl:flex 2xl:text-[15px]" />
                )}
            </div>

            <SuggestionForSubscribing />
        </div>
    );
};

export { BaseLayout };
