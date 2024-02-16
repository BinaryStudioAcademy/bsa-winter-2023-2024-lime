const ThemeColors = {
    LIGHT : {
        TEXT: 'text-lm-grey-500 ',
        BACKGROUND: 'bg-lm-grey-100'
    },
    DARK: {
        TEXT: 'dark:text-white',
        BACKGROUND: 'dark:bg-lm-black-200'
    },
} as const;

const ThemeCompose = {
    TEXT: `${ThemeColors.LIGHT.TEXT} + ${ThemeColors.DARK.TEXT}`,
    BACKGROUND: `${ThemeColors.LIGHT.BACKGROUND} + ${ThemeColors.DARK.BACKGROUND}`
} as const;

export { ThemeCompose };
