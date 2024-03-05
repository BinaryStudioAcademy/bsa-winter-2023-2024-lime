import { Header } from '~/bundles/common/components/header/header.js';
import { Sidebar } from '~/bundles/common/components/sidebar/sidebar.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { useSidebarToggle } from '../../hooks/hooks.js';
import { RouterOutlet } from '../components.js';
import styles from './styles.module.css';

type Properties = {
    children?: ReactNode;
};

const BaseLayout: React.FC<Properties> = () => {
    const { toggleSidebar, isOpen } = useSidebarToggle();

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
                <RouterOutlet />
            </div>
        </div>
    );
};

export { BaseLayout };
