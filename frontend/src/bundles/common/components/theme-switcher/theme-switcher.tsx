import { actions as themeActions } from '~/bundles/common/store/theme.js';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '../../hooks/hooks.js';
import { Loader } from '../components.js';
import { Switch } from './components/switch.js';

function ThemeSwitcher(): JSX.Element {
    const dispatch = useAppDispatch();
    const { theme, loading } = useAppSelector((state) => state.theme);

    // Fetch theme when component mounts
    useEffect(() => {
        void dispatch(themeActions.fetchTheme());
    }, [dispatch]);

    const toggleTheme = useCallback(() => {
        if (!loading && theme) {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            void dispatch(themeActions.setTheme(newTheme));
        }
    }, [dispatch, loading, theme]);

    if (loading) {
        return <Loader />;
    }

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
