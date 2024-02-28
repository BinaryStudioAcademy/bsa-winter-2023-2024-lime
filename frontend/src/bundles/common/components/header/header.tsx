import logo from '~/assets/img/logo.svg';

import { AppRoute, ComponentSize } from '../../enums/enums.js';
import { Icon, Layout, Link } from '../components.js';
import { IconColor } from '../icon/enums/enums.js';
import { Message, Navigation } from './components/components.js';
import styles from './styles.module.css';

const Header = (): JSX.Element => {
    return (
        <header className={styles['header']}>
            <Layout className={`${styles['header-container']}`}>
                <div className="hidden w-full max-w-[16rem]  md:flex">
                    <Link to={AppRoute.ROOT}>
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className="mr-5 md:hidden">
                    <Icon
                        name={'logoIcon'}
                        color={IconColor.PRIMARY}
                        size={ComponentSize.LARGE}
                    />
                </div>
                <div className="flex w-full justify-between">
                    <Message />
                    <Navigation />
                </div>
            </Layout>
        </header>
    );
};

export { Header };
