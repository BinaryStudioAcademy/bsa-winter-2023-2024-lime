/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
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
            },
        },
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        fontFamily: 'Manrope',
                        color: '#222222',
                    },
                },
                'h1-bold': {
                    css: {
                        fontSize: '42px',
                        fontWeight: 600,
                        lineHeight: '57px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                    },
                },
                'h1-semibold': {
                    css: {
                        fontSize: '40px',
                        fontWeight: 600,
                        lineHeight: '55px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                    },
                },
                'h1-regular': {
                    css: {
                        fontFamily: 'Manrope',
                        fontSize: '40px',
                        fontWeight: 400,
                        lineHeight: '55px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                    },
                },
                h2: {
                    css: {
                        fontSize: '28px',
                        fontWeight: 600,
                        lineHeight: '36px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                    },
                },
                h3: {
                    css: {
                        fontSize: '22px',
                        fontWeight: 600,
                        lineHeight: '34px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                    },
                },
                h4: {
                    css: {
                        fontSize: '20px',
                        fontWeight: 600,
                        lineHeight: '28px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                    },
                },
                h5: {
                    css: {
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '22px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                    },
                },
                body: {
                    css: {
                        fontSize: '16px',
                        fontWeight: 600,
                        lineHeight: '20px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                    },
                },
                'body-small': {
                    css: {
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                    },
                },
                'body-small-bold': {
                    css: {
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: '20px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                    },
                },
                caption: {
                    css: {
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '16px',
                        letterSpacing: '0px',
                        textAlign: 'left',
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
