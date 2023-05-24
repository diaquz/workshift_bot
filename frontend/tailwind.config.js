/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('tw-elements/dist/plugin')
  ]
}

