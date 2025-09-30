/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Apple-inspired color palette
                apple: {
                    white: '#FFFFFF',
                    black: '#000000',
                    gray: {
                        50: '#F5F5F7',
                        100: '#E5E5E7',
                        200: '#D1D1D6',
                        300: '#C7C7CC',
                        400: '#AEAEB2',
                        500: '#8E8E93',
                        600: '#636366',
                        700: '#48484A',
                        800: '#3A3A3C',
                        900: '#1D1D1F',
                    },
                    blue: '#007AFF',
                    green: '#30D158',
                    orange: '#FF9500',
                    red: '#FF3B30',
                    purple: '#AF52DE',
                    pink: '#FF2D92',
                    yellow: '#FFD60A',
                },
                // Semantic colors
                primary: {
                    50: '#E3F2FD',
                    100: '#BBDEFB',
                    200: '#90CAF9',
                    300: '#64B5F6',
                    400: '#42A5F5',
                    500: '#007AFF', // Apple Blue
                    600: '#1976D2',
                    700: '#1565C0',
                    800: '#0D47A1',
                    900: '#0A3D91',
                },
                background: {
                    light: '#FFFFFF',
                    dark: '#000000',
                    glass: 'rgba(255, 255, 255, 0.8)',
                    glassDark: 'rgba(0, 0, 0, 0.8)',
                }
            },
            fontFamily: {
                sans: ['SF Pro Display', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['SF Mono', 'JetBrains Mono', 'monospace'],
            },
            fontSize: {
                'xs': ['12px', { lineHeight: '16px' }],
                'sm': ['14px', { lineHeight: '20px' }],
                'base': ['16px', { lineHeight: '24px' }],
                'lg': ['20px', { lineHeight: '28px' }],
                'xl': ['24px', { lineHeight: '32px' }],
                '2xl': ['32px', { lineHeight: '40px' }],
                '3xl': ['48px', { lineHeight: '56px' }],
                '4xl': ['64px', { lineHeight: '72px' }],
                '5xl': ['80px', { lineHeight: '88px' }],
            },
            spacing: {
                '18': '72px',
                '22': '88px',
                '26': '104px',
                '30': '120px',
                '34': '136px',
                '38': '152px',
                '42': '168px',
                '46': '184px',
                '50': '200px',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'fade-in-down': 'fadeInDown 0.8s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-down': 'slideDown 0.6s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'blur-in': 'blurIn 0.4s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                blurIn: {
                    '0%': { opacity: '0', filter: 'blur(10px)' },
                    '100%': { opacity: '1', filter: 'blur(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'apple': '0 4px 20px rgba(0, 0, 0, 0.1)',
                'apple-lg': '0 8px 40px rgba(0, 0, 0, 0.15)',
                'apple-xl': '0 12px 60px rgba(0, 0, 0, 0.2)',
                'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
            },
            borderRadius: {
                'apple': '12px',
                'apple-lg': '16px',
                'apple-xl': '20px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
} 