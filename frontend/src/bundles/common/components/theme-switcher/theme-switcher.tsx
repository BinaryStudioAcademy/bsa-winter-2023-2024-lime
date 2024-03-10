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

function ThemeSwitcher({ className }: Properties): JSX.Element {
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
                    checked={theme === Theme.DARK}
                    onChange={toggleTheme}
                    size={64}
                />
            </div>
        </>
    );
}

export { ThemeSwitcher };
