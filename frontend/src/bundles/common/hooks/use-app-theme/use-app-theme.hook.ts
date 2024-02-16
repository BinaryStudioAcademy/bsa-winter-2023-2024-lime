import { useEffect, useState } from '~/bundles/common/hooks/hooks.js';

type Theme = 'dark' | 'light';

function useDarkTheme(): [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
    const currentTheme = localStorage.getItem('theme');
    const colorTheme = currentTheme === null ? 'dark' : currentTheme as Theme;
    const [theme, setTheme] = useState(colorTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        // save theme to local storage
        localStorage.setItem('theme', theme);
        
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}

export { useDarkTheme };
