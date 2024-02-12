/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            'lm-green': '#037768',
            'lm-red': '#F62D2D',
            'lm-purple': '#7306FF',
            'lm-magenta': '#DC40CD',
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
            },
        },
        extend: {
            animation: {
                'load': 'load 700ms infinite ease-in-out',
            },
            keyframes: {
                'load': {
                    '0%': { transform: 'rotate(0)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [],
};
