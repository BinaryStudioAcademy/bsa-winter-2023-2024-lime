import { actions as themeActions } from '~/bundles/common/store/theme.js';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '../../hooks/hooks.js';
import { Switch } from './components/switch.js';

function ThemeSwitcher(): JSX.Element {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector((state) => state.theme);

    useEffect(() => {
        void dispatch(themeActions.fetchTheme());
    }, [dispatch]);

    const toggleTheme = useCallback(() => {
        if (theme) {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            void dispatch(themeActions.toggleTheme(newTheme));
        }
    }, [dispatch, theme]);

    return (
        <>
            <div className="absolute bottom-0 right-0">
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
