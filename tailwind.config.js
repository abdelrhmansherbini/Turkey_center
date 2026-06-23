/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        crimson: {
          50: '#fff0f1',
          100: '#ffdde0',
          200: '#ffc0c6',
          300: '#ff929e',
          400: '#ff5668',
          500: '#ff2239',
          600: '#DC143C',
          700: '#b80f31',
          800: '#9b0f2e',
          900: '#84112c',
          950: '#490412',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
