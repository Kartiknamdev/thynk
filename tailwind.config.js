const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        secondary: {
          DEFAULT: '#EC4899',
          50: '#FCE7F3',
          100: '#FBCFE8',
          200: '#F9A8D4',
          300: '#F472B6',
          400: '#EC4899',
          500: '#DB2777',
          600: '#BE185D',
          700: '#9D174D',
          800: '#831843',
          900: '#6B1139',
        },
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.15)',
        'glass-dark': 'rgba(0, 0, 0, 0.15)',
      },
      backdropFilter: {
        'glass': 'blur(10px)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'gradient-slow': 'gradient 15s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': '0% 50%',
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': '100% 50%',
          },
        },
        morph: {
          '0%, 100%': { 'border-radius': '63% 37% 54% 46% / 55% 48% 52% 45%' },
          '14%': { 'border-radius': '40% 60% 54% 46% / 49% 60% 40% 51%' },
          '28%': { 'border-radius': '54% 46% 38% 62% / 49% 70% 30% 51%' },
          '42%': { 'border-radius': '61% 39% 55% 45% / 61% 38% 62% 39%' },
          '56%': { 'border-radius': '61% 39% 67% 33% / 70% 50% 50% 30%' },
          '70%': { 'border-radius': '50% 50% 34% 66% / 56% 68% 32% 44%' },
          '84%': { 'border-radius': '46% 54% 50% 50% / 35% 61% 39% 65%' },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)',
            'animation-timing-function': 'ease-in-out',
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(5deg)',
            'animation-timing-function': 'ease-in-out',
          },
        },
      },
    },
  },
  plugins: [],
});
