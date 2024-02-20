import {
    useCallback,
    useDarkTheme,
    useEffect,
    useState,
} from '../../hooks/hooks.js';
import { Loader } from '../components.js';
import { Switch } from './components/switch.js';

function ThemeSwitcher(): JSX.Element {
    const [colorTheme, setTheme, loading] = useDarkTheme();

    const [darkSide, setDarkSide] = useState<boolean>(false);

    const toggleDarkMode = useCallback(
        (checked: boolean) => {
            const newTheme = checked ? 'dark' : 'light';
            setTheme(newTheme);
            setDarkSide(checked);
        },
        [setTheme],
    );

    useEffect(() => {
        setDarkSide(colorTheme === 'dark' ? true : false);
    }, [colorTheme]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="absolute bottom-0 right-0">
                <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    size={64}
                />
            </div>
        </>
    );
}

export { ThemeSwitcher };
