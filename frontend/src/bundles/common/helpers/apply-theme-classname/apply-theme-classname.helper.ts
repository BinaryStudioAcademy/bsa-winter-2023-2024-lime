import { type Theme, type ValueOf } from '../../types/types.js';

function applyThemeClassname(theme: ValueOf<typeof Theme>): void {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
}

export { applyThemeClassname };
