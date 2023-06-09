const {fontFamily} = require('tailwindcss/defaultTheme');
const {colors} = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    contianer: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-monserrat)', ...fontFamily.sans]
      },
      colors: {
        ...colors,
        'light-blue': '#74B9BD',
        'dark-blue': '#111F50',
        'light-gold': '#f5bc51',
        'dark-gold': '#533519',
        'darker-blue': '#020327'
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
