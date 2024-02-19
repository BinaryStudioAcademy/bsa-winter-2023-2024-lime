import { type ReactNode } from 'react';

import { Header } from '~/bundles/common/components/header/header.js';
import { Sidebar } from '~/bundles/common/components/sidebar/sidebar.js';

import styles from './styles.module.css';

type Properties = {
    children?: ReactNode;
};

const BasicLayout: React.FC<Properties> = ({ children }) => {
    return (
        <div className={styles['basic-layout']}>
            <Header />

            <Sidebar isOpen={true} />

            <div className={styles['content-container']}>{children}</div>
        </div>
    );
};

export { BasicLayout };
