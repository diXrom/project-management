/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const form = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        layout: '80px 1fr 80px',
      },
      extend: {
        opacity: ['disabled'],
      },
    },
  },
  plugins: [form, typography],
};
