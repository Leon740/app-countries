/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx}',
    './public/**/*.html',
  ],
  theme: {
    fontFamily: {
      nunito: ['NunitoSans', 'sans-serif'],
    },
    colors: {
      ...colors,
      customgray: {
        100: '#202D36',
        200: '#2B3743',
      },
    },
    extend: {},
  },
  plugins: [],
};
