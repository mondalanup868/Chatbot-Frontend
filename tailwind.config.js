/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        royal: {
          50: '#EEF4FF',
          100: '#DCE7FD',
          200: '#B9CFFB',
          300: '#8FADF7',
          400: '#6385F0',
          500: '#3B5FE3',
          600: '#2547C7',
          700: '#1D38A0',
          800: '#1B2F7A',
          900: '#1A2A5E',
          950: '#131C40',
        },
        abyss: {
          950: '#0B1220',
          900: '#111A2E',
          850: '#16213A',
          800: '#1B2947',
          700: '#24365C',
          600: '#2F4773',
        },
        neon: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        ink: {
          950: '#05060A',
          900: '#090B11',
          850: '#0D1017',
          800: '#12151D',
          700: '#1A1F2B',
          600: '#252B3A',
        },
        champagne: {
          200: '#F7EED8',
          300: '#EFE1BE',
          400: '#E3CE9B',
          500: '#D4B872',
        },
      },
      boxShadow: {
        'panel': '0 32px 72px -24px rgba(0,0,0,0.65)',
        'flat': '0 2px 8px rgba(0,0,0,0.35)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ringPulse: {
          '0%': { transform: 'scale(0.92)', opacity: '0.8' },
          '70%': { transform: 'scale(1.35)', opacity: '0' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        typingBounce: {
          '0%, 80%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '40%': { transform: 'translateY(-5px)', opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ring-pulse': 'ringPulse 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing-dot': 'typingBounce 1.2s ease-in-out infinite',
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}


