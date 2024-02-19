import { useCallback, useDarkTheme, useState } from '../../hooks/hooks.js';
import { Loader } from '../components.js';
import { Switch } from './components/switch.js';

function ThemeSwitcher(): JSX.Element {
    const [colorTheme, setTheme, loading] = useDarkTheme();
    const [darkSide, setDarkSide] = useState<boolean>(
        colorTheme === 'dark' ? true : false,
    );    
    const toggleDarkMode = useCallback(
        (checked: boolean) => {
            const newTheme = checked ?  'light' : 'dark';            
            setTheme(newTheme);
            setDarkSide(checked);
        },
        [setTheme],
    );

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            <div className='absolute bottom-0 right-0'>
                <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    size={56}
                />
            </div>
        </>
    );
}

export { ThemeSwitcher };
