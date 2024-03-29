import { Theme } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { actions as themeActions } from '~/bundles/common/store/theme.js';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '../../hooks/hooks.js';
import { Switch } from './components/switch.js';

type Properties = {
    className?: string;
};

const defaultClassName =
    'fixed bg-primary rounded-full md:bottom-3 md:right-3 bottom-2 right-2';

const ThemeSwitcher: React.FC<Properties> = ({
    className = defaultClassName,
}): JSX.Element => {
    const dispatch = useAppDispatch();

    const { theme } = useAppSelector(({ theme }) => theme);
    const size = window.innerWidth < 768 ? 48 : 52;

    useEffect(() => {
        void dispatch(themeActions.fetchTheme());
    }, [dispatch]);

    const toggleTheme = useCallback(() => {
        if (theme) {
            const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
            void dispatch(themeActions.toggleTheme(newTheme));
        }
    }, [dispatch, theme]);

    return (
        <>
            <div className={getValidClassNames(className)}>
                <Switch
                    checked={theme === Theme.DARK}
                    onChange={toggleTheme}
                    size={size}
                />
            </div>
        </>
    );
};

export { ThemeSwitcher };
