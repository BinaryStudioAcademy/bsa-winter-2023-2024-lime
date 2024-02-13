import logo from '~/assets/img/logo.svg';

import { getValidClassNames } from '../../helpers/helpers.js';
import { Layout, Link } from '../components.js';
import { Message, Navigation } from './components/components.js';
import styles from './styles.module.css';

const Header = (): JSX.Element => {
    return (
        <header className={styles['header']}>
            <Layout className={getValidClassNames(styles['header-container'])}>
                <div className={styles['header__logo-wrapper']}>
                    <Link to={'/'}>
                        <img
                            src={logo}
                            alt="Logo"
                            className={styles['header__logo']}
                        />
                    </Link>
                </div>
                <div className={styles['header__navigation']}>
                    <Message />
                    <Navigation avatarUrl={null} />
                </div>
            </Layout>
        </header>
    );
};

export { Header };
