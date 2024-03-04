import { useState } from 'react';

import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { Header } from '~/bundles/common/components/header/header.js';
import { Sidebar } from '~/bundles/common/components/sidebar/sidebar.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import {
    useAppDispatch,
    useCallback,
    useSidebarToggle,
} from '../../hooks/hooks.js';
import { Button, ButtonVariant, Modal, RouterOutlet } from '../components.js';
import styles from './styles.module.css';

type Properties = {
    children?: ReactNode;
};

const BaseLayout: React.FC<Properties> = () => {
    const { toggleSidebar, isOpen } = useSidebarToggle();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch();

    const handleLogout = useCallback((): void => {
        void dispatch(authActions.logout());
    }, [dispatch]);

    const handleCloseModal = useCallback((): void => {
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    return (
        <div
            className={getValidClassNames(
                styles['base-layout'],
                isOpen ? '' : styles['sidebar-closed'],
            )}
        >
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isOpen} openModal={handleOpenModal} />

            <div className={styles['content-container']}>
                <RouterOutlet />

                <div className={'flex flex-col gap-4'}>
                    <Modal
                        isOpen={isModalOpen}
                        title="Are you sure you want to leave?"
                        onClose={handleCloseModal}
                    >
                        <div className={'flex gap-4'}>
                            <Button
                                size={ComponentSize.MEDIUM}
                                variant={ButtonVariant.PRIMARY}
                                label={'Leave'}
                                onClick={handleLogout}
                            />
                            <Button
                                size={ComponentSize.MEDIUM}
                                variant={ButtonVariant.PRIMARY}
                                label={'Cancel'}
                                onClick={handleCloseModal}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export { BaseLayout };
