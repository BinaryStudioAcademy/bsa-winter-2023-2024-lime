import { type Theme } from '../../types/types.js';

function applyThemeClassname (theme: Theme): void {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
}

export { applyThemeClassname };