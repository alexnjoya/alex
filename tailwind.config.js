/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f5faff',
          100: '#e0f2ff',
          200: '#b9e3ff',
          300: '#7fd0ff',
          400: '#36b0ff',
          500: '#008cff',
          600: '#006fd1',
          700: '#0056a3',
          800: '#003e75',
          900: '#002847',
        },
        secondary: {
          500: '#ffb300',
        },
      },
    },
  },
  plugins: [],
}; 