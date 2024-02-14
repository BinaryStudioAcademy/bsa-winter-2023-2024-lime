import logo from '~/assets/img/logo.svg';

import { AppRoute } from '../../enums/app-route.enum.js';
import { Layout, Link } from '../components.js';
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
                <div className={styles['header__navigation']}>
                    <Message />
                    <Navigation />
                </div>
            </Layout>
        </header>
    );
};

export { Header };
