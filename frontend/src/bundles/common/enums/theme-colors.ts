const ThemeColors = {
    STANDART: {
        LIGHT: {
            TEXT: 'text-lm-black-100',
            BACKGROUND: 'bg-lm-grey-200',
        },
        DARK: {
            TEXT: 'dark:text-white',
            BACKGROUND: 'dark:bg-lm-black-200',
        },
    },
    INPUT: {
        LIGHT: {
            TEXT: 'text-lm-grey-100 placeholder:text-lm-grey-200',
            BACKGROUND: 'bg-lm-black-100',
        },
        DARK: {
            TEXT: 'dark:text-lm-grey-400 dark:placeholder:text-lm-grey-200',
            BACKGROUND: 'dark:bg-lm-black-400',
        },
    },
    ERROR: {
        LIGHT: {
            TEXT: 'text-lm-red',
        },
        DARK: {
            TEXT: 'dark:text-lm-red',
        },
    },
} as const;

const ThemeCompose = {
    STANDART: {
        TEXT: `${ThemeColors.STANDART.LIGHT.TEXT} ${ThemeColors.STANDART.DARK.TEXT}`,
        BACKGROUND: `${ThemeColors.STANDART.LIGHT.BACKGROUND} ${ThemeColors.STANDART.DARK.BACKGROUND}`,
    },
    INPUT: {
        TEXT: `${ThemeColors.INPUT.LIGHT.TEXT} ${ThemeColors.INPUT.DARK.TEXT}`,
        BACKGROUND: `${ThemeColors.INPUT.LIGHT.BACKGROUND} ${ThemeColors.INPUT.DARK.BACKGROUND}`,
    },
    ERROR: {
        TEXT: `${ThemeColors.ERROR.LIGHT.TEXT} ${ThemeColors.ERROR.DARK.TEXT}`,
    },
} as const;

export { ThemeCompose };
