import logo from '~/assets/img/logo.svg';

import { AppRoute } from '../../enums/enums.js';
import { Icon, Layout, Link } from '../components.js';
import { IconColor, IconSize } from '../icon/enums/enums.js';
import { Message, Navigation } from './components/components.js';
import styles from './styles.module.css';

const Header = (): JSX.Element => {
    return (
        <header className={styles['header']}>
            <Layout className={`${styles['header-container']}`}>
                <div className={styles['header__logo-wrapper']}>
                    <Link to={AppRoute.ROOT}>
                        <img
                            src={logo}
                            alt="Logo"
                            className={styles['header__logo']}
                        />
                    </Link>
                </div>
                <div className={styles['burger-menu__button']}>
                    <Icon
                        name={'logoIcon'}
                        color={IconColor.PRIMARY}
                        size={IconSize.LARGE}
                    />
                </div>
                <div className={styles['header__navigation']}>
                    <Message />
                    <Navigation />
                </div>
            </Layout>
        </header>
    );
};

export { Header };
