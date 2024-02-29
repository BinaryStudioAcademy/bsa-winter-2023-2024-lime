import { type ReactNode } from 'react';

import { Header } from '~/bundles/common/components/header/header.js';
import { Sidebar } from '~/bundles/common/components/sidebar/sidebar.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { useSidebarToggle } from '../../hooks/hooks.js';
import styles from './styles.module.css';

type Properties = {
    children?: ReactNode;
};

const BaseLayout: React.FC<Properties> = ({ children }) => {
    const { toggleSidebar, isOpen } = useSidebarToggle();
    return (
        <div
            className={getValidClassNames(
                styles['base-layout'],
                isOpen ? '' : styles['sidebar-closed'],
            )}
        >
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isOpen} />

            <div className={styles['content-container']}>{children}</div>
        </div>
    );
};

export { BaseLayout };
