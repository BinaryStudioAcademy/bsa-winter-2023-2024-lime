import { Theme as ThemeEnum } from '~/bundles/common/enums/enums.js';

import { type Theme, type ValueOf } from '../../types/types.js';

function applyThemeClassname(theme: ValueOf<typeof Theme>): void {
    const root = window.document.documentElement;
    root.classList.remove(ThemeEnum.DARK, ThemeEnum.LIGHT);
    root.classList.add(theme);
}

export { applyThemeClassname };
