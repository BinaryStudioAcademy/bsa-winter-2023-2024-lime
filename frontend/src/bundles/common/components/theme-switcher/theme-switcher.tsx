import { Theme } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    createSelector,
    selectTheme,
} from '~/bundles/common/redux/selectors/selectors.js';
import { actions as themeActions } from '~/bundles/common/store/theme.js';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
} from '../../hooks/hooks.js';
import { Switch } from './components/switch.js';

type Properties = {
    className?: string;
};
function ThemeSwitcher({ className }: Properties): JSX.Element {
    const dispatch = useAppDispatch();

    const selectThemeData = useMemo(
        () =>
            createSelector([selectTheme], (theme) => ({
                theme: theme.theme,
            })),
        [],
    );

    const { theme } = useAppSelector(selectThemeData);

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
