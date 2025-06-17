/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); // Don't forget this line

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This will create classes like font-roboto
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        jetbrain: ['JetBrain'],
        // If you really want a separate class for the "ExtraBold" file specifically,
        // even though it's part of 'Roboto' family by weight, you could do:
        // robotoExtra: ['Roboto', ...defaultTheme.fontFamily.sans],
        // But usually, setting `font-weight: 800` would suffice with `font-roboto`.
      },
    },
  },
  plugins: [],
}