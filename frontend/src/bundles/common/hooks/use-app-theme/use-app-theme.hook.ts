import { useEffect, useState } from '~/bundles/common/hooks/hooks.js';
import { storage } from '~/framework/storage/storage.js';

type Theme = 'dark' | 'light';

function useDarkTheme(): [
    Theme | null,
    React.Dispatch<React.SetStateAction<Theme | null>>, boolean,
] {
    const [theme, setTheme] = useState<Theme | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTheme = async (): Promise<void> => {
            try {
                const currentTheme = await storage.get('theme');
                const colorTheme =
                    currentTheme === null ? 'dark' : (currentTheme as Theme);
                setTheme(colorTheme);
            } catch (error) {
                throw new Error(String(error));
            } finally {
                setLoading(false);
            }
        };

        fetchTheme().catch((error) => {
            throw new Error(String(error));
        });
    }, []);

    useEffect(() => {
        if (!loading && theme !== null) {
            const root = window.document.documentElement;
            root.classList.remove('dark', 'light');
            root.classList.add(theme);

            storage.set('theme', theme).catch((error) => {
                throw new Error(String(error));
            });
        }
    }, [theme, loading]);

    return [theme, setTheme, loading];
}

export { useDarkTheme };