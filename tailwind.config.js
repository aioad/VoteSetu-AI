/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF3FB',
          100: '#D3E0F5',
          200: '#A7C1EB',
          300: '#6E98D9',
          400: '#3F72C4',
          500: '#1B4FA8',
          600: '#143C8A',
          700: '#0F2C68',
          800: '#0A1E4A',
          900: '#061330',
        },
        saffron: {
          50: '#FFF7ED',
          100: '#FEEDD3',
          200: '#FDD4A0',
          300: '#FBB464',
          400: '#F98B25',
          500: '#F07010',
          600: '#D4550A',
          700: '#AE3E09',
          800: '#8C320E',
          900: '#72280E',
        },
        forest: {
          50: '#EDFAF3',
          100: '#D3F3E4',
          200: '#A8E6CB',
          300: '#6ED0AB',
          400: '#35B485',
          500: '#0E9668',
          600: '#087852',
          700: '#075E40',
          800: '#054832',
          900: '#033325',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.45s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'flow-down': 'flowDown 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.97)' },
        },
        flowDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
