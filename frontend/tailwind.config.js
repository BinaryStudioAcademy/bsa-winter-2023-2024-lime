/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

const ButtonColors = {
    TEXT: 'var(--button-text)',
    PRIMARY: 'var(--button-primary)',
    SECONDARY: 'var(--button-secondary)',
    TERTIARY: 'var(--button-tertiary)',
};

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        colors: {
            transparent: 'transparent',
            'white': '#ffffff',
            'lm-green': '#037768',
            'lm-red': '#F62D2D',
            'lm-emerald': '#8cc751',
            'lm-cyan': '#05CFCF',
            'lm-light-blue': '#056ECF',
            'lm-light-yellow': '#f1ffca',
            'lm-mint': {
                100: '#90EE90',
                200: '#50C878',
            },
            'lm-purple': {
                100: '#7E51FF',
                200: '#7306FF',
            },
            'lm-magenta': {
                100: '#FF5EB1',
                200: '#DC40CD',
            },
            'lm-yellow': {
                100: '#E0FE10',
                200: '#B2CA0D',
            },
            'lm-grey': {
                100: '#AEB4BB',
                200: '#798392',
                300: '#475569',
                400: '#64748B',
                500: '#383F4A',
            },
            'lm-blue': {
                400: '#242636',
                500: '#1E1E2C',
            },
            'lm-black': {
                100: '#2A2F37',
                200: '#1C2227',
                300: '#313134',
                400: '#000000',
            },
            'strava-brand': '#FC4C02',
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            prebase: '0.9375rem',
            base: '1rem',
            md: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.375rem',
            '3xl': '1.75rem',
            '4xl': '2.625rem',
            '5xl': '5rem',
        },
        fontWeight: {
            light: '300',
            normal: '400',
            semibold: '500',
            bold: '600',
            extrabold: '700',
            heavybold: '800',
        },
        lineHeight: {
            '1': '0.75rem',
            '2': '0.875rem',
            '3': '1rem',
            '4': '1.25rem',
            '5': '1.375rem',
            '6': '1.75rem',
            '7': '2.125rem',
            '8': '2.25rem',
            '9': '3.5856rem',
        },
        screens: {
            'sm': '370px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
        },
        extend: {
            animation: {
                'load': 'spin 700ms infinite ease-in-out',
                'fade-in': 'fade-in 500ms ease-in',
            },
            keyframes: {
                'fade-in': {
                    '0%': {
                        transform: 'scale(0)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                },
            },
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans],
                accent: ['Lato', ...defaultTheme.fontFamily.sans],
                heading: ['Intro', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'auth': 'linear-gradient(to right, #E0FE10 20%, transparent 130%), linear-gradient(to right, #2A2F37 20%, transparent 100%), url("~/assets/img/auth-bg.png")',
                'rectangle':
                    'linear-gradient(89.83deg, #E0FE10 36.42%, rgba(224, 254, 16, 0) 125.23%)',
                'goalWidget': 'var(--gradient-goal-widget)',
                'wave-yellow': 'url("~/assets/img/wave-yellow.svg")',
                'wave-magenta': 'url("~/assets/img/wave-magenta.svg")',
                'wave-purple': 'url("~/assets/img/wave-purple.svg")',
                'wave-grey': 'url("~/assets/img/wave-grey.svg")',
                'wave-green': 'url("~/assets/img/wave-green.svg")',
                'progress-line': 'url("~/assets/img/progress-line.svg")',
            },
            borderRadius: {
                '30': '1.9rem',
                '34': '2.1rem',
            },
            width: {
                '30': '7.5625rem',
                '50': '12.5',
                '83': '5.1875',
                '115': '115px',
                '120': '120px',
                '150': '9.375rem',
                '176': '11rem',
                '874': '54.625',
            },
            height: {
                '30': '7.5625rem',
                '37': '2.3125rem',
                '38': '2.375rem',
                '54': '3.375rem;',
                '176': '11rem',

            },
            spacing: {
                '13': '3.25',
                '18': '4.875',
                '44': '2.75rem',
                '60': '3.75rem',
            },
            minHeight: {
                '90': 'calc(100vh - 5.5rem)',
            },
            maxHeight: {
                '90': 'calc(100vh - 5.5rem)',
            },
            textColor: {
                primary: 'var(--text-primary)',
                secondary: 'var(--text-secondary)',
                action: 'var(--text-action)',
                infoSection: 'var(--text-info-section)',
                card: 'var(--text-card)',
                buttonText: ButtonColors.TEXT,
                buttonPrimary: ButtonColors.PRIMARY,
                buttonSecondary: ButtonColors.SECONDARY,
                buttonTertiary: ButtonColors.TERTIARY,
            },
            backgroundColor: {
                primary: 'var(--background-primary)',
                secondary: 'var(--background-secondary)',
                tertiary: 'var(--background-tertiary)',
                buttonPrimary: ButtonColors.PRIMARY,
                buttonSecondary: ButtonColors.SECONDARY,
                buttonTertiary: ButtonColors.TERTIARY,
                schedule: 'var(--background-schedule)',
            },
            borderColor: {
                primary: 'var(--border-primary)',
                inactive: 'var(--border-inactive)',
                buttonPrimary: ButtonColors.PRIMARY,
                buttonSecondary: ButtonColors.SECONDARY,
                buttonTertiary: ButtonColors.TERTIARY,
            },
            ringColor: {
                primary: 'var(--ring-primary)',
                inactive: 'var(--ring-inactive)',
            },
            stroke: {
                progressBase: 'var(--stroke-progress-base-bg)',
                primary: 'var(--circle-primary)',
            },
        },
    },
    plugins: [],
};
