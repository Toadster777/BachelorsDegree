/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    aspectRatio: {
      '4/3': '4 / 3',
    },
    screens: {
      sm: '480px', //20px
      md: '768px', //6.5%
      lg: '1024px', //6.5%
      xl: '1920px', //max-width: 1520px
    },
    colors: {
      "primary": "#215196",

      "secondary": "#ff882d",

      "accent": "#708090",

      "neutral": "#211017",

      "info": "#006cf6",

      "success": "#00bd66",

      "warning": "#fb923c",

      "error": "#dc2626",
    },
    fontFamily: {
      heading: ['Raleway'],
      paragraph: ['Montserrat'],
    },
  },

  plugins: [
    require('flowbite/plugin'),
  ]
}