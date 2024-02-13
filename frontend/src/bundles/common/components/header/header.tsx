import { Layout, Link } from '../components.js';
import { LogoIcon, LogoIconColor, LogoIconSize } from '../icons/icons.js';

const Header = (): JSX.Element => {
    return (
        <header className="bg-lm-black-100">
            <Layout>
                <Link to={'/'}>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-lm-yellow-100 items-center">
                            LIME
                        </span>
                        <LogoIcon
                            size={LogoIconSize.LARGE}
                            color={LogoIconColor.PRIMARY}
                        />
                    </div>
                </Link>
                <div></div>
            </Layout>
        </header>
    );
};

export { Header };
