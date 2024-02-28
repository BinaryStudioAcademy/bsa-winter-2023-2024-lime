import { type ReactNode } from 'react';

import { Header } from '~/bundles/common/components/header/header.js';
import { Sidebar } from '~/bundles/common/components/sidebar/sidebar.js';

import { RouterOutlet } from '../components.js';
import styles from './styles.module.css';

type Properties = {
    children?: ReactNode;
};

const BaseLayout: React.FC<Properties> = () => {
    return (
        <div className={styles['base-layout']}>
            <Header />

            <Sidebar isOpen={true} />

            <div className={styles['content-container']}>
                <RouterOutlet />
            </div>
        </div>
    );
};

export { BaseLayout };
