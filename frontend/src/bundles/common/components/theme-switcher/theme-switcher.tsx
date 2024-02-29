import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { actions as themeActions } from '~/bundles/common/store/theme.js';

import { Theme } from '../../enums/theme.js';
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

const defaultClassName = 'absolute bottom-4 right-4';

function ThemeSwitcher({
    className = defaultClassName,
}: Properties): JSX.Element {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector((state) => state.theme);

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
                    checked={theme === 'dark' ? true : false}
                    onChange={toggleTheme}
                    size={64}
                />
            </div>
        </>
    );
}

export { ThemeSwitcher };
