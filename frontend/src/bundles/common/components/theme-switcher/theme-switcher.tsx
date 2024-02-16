
import { useCallback, useDarkTheme, useState } from '../../hooks/hooks.js';
import { Switch } from './components/switch.js';

function Switcher():JSX.Element {
  const [colorTheme, setTheme] = useDarkTheme();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === 'dark' ? true : false);

  const toggleDarkMode = useCallback((checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    setDarkSide(checked);
  },[setTheme]);

  return (
    <>
      <div>
        <Switch checked={darkSide} onChange={toggleDarkMode} size={56} />
      </div>
    </>
  );
}

export { Switcher };
