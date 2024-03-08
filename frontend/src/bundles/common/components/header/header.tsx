import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';

import logo from '~/assets/img/logo.svg';
import { type UserAuthResponseDto } from '~/bundles/common/types/types.js';

import { AppRoute, ComponentSize } from '../../enums/enums.js';
import { useAppSelector } from '../../hooks/hooks.js';
import { Button, Icon, Layout, Link } from '../components.js';
import { IconColor } from '../icon/enums/enums.js';
import { Message, Navigation } from './components/components.js';
import styles from './styles.module.css';

type HeaderProperties = {
    toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProperties): JSX.Element => {
    const { user } = useAppSelector(({ auth }) => ({
        user: auth.user as UserAuthResponseDto,
    }));

    const { email, avatarUrl } = user || {};

    return (
        <header className={styles['header']}>
            <Layout className={`${styles['header-container']}`}>
                <div className="hidden w-full max-w-[16rem]  md:flex">
                    <Link to={AppRoute.ROOT}>
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className="mr-5 md:hidden">
                    <Button
                        label=""
                        variant="secondary"
                        onClick={toggleSidebar}
                        leftIcon={<Bars3BottomLeftIcon className="h-4 w-4" />}
                        size="sm"
                        className="p-4 px-1 py-0"
                    />
                </div>
                <div className="mr-5 md:hidden">
                    <Link to={AppRoute.ROOT}>
                        <Icon
                            name={'logoIcon'}
                            color={IconColor.PRIMARY}
                            size={ComponentSize.LARGE}
                        />
                    </Link>
                </div>
                <div className="flex w-full justify-between">
                    <Message />
                    <Navigation email={email} avatarUrl={avatarUrl || ''} />
                </div>
            </Layout>
        </header>
    );
};

export { Header };
