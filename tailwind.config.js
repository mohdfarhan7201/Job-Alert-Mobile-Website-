/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'app-bg': '#030303',
                'app-surface': '#0d0d12',
                'app-accent': '#6366f1',
                'app-accent-secondary': '#8b5cf6',
                'app-text-secondary': '#94a3b8',
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
                'profile-gradient': 'linear-gradient(135deg, #1e1b4b, #312e81)',
            },
            boxShadow: {
                'accent-glow': '0 0 20px rgba(99, 102, 241, 0.3)',
            },
            animation: {
                'slide-up': 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'fade-in': 'fadeIn 0.3s ease-out forwards',
            },
            keyframes: {
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
