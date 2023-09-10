/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        notoSerif: ['"Noto Serif"', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
