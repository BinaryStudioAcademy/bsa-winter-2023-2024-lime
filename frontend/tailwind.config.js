/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        colors: {
            transparent: 'transparent',
            'white': '#ffffff',
            'lm-green': '#037768',
            'lm-red': '#F62D2D',
            'lm-purple': '#7306FF',
            'lm-magenta': '#DC40CD',
            'lm-background-light': '#a9ccff',
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
            'lm-black': {
                100: '#2A2F37',
                200: '#1C2227',
                300: '#313134',
                400: '#000000',
            },
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            xl: '1.25rem',
            '2xl': '1.375rem',
            '3xl': '1.75rem',
            '4xl': '2.625rem',
        },
        fontWeight: {
            normal: '400',
            semibold: '500',
            bold: '600',
            extrabold: '700',
        },
        lineHeight: {
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
            },
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'auth': 'linear-gradient(to right, #E0FE10 20%, transparent 130%), linear-gradient(to right, #2A2F37 20%, transparent 100%), url("./src/assets/img/auth-bg.png")',
                'rectangle':
                    'linear-gradient(89.83deg, #E0FE10 36.42%, rgba(224, 254, 16, 0) 125.23%)',
            },
            borderRadius: {
                '34': '2.1rem',
            },
            width: {
                '30': '7.5625rem',
            },
            height: {
                '30': '7.5625rem',
            },
        },
    },
    plugins: [],
};
