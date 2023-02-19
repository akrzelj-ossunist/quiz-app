/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'phone': {"max": '375px'},
  
      'tablet': {"min": '376px', "max": '675px'},
  
      'desktop': {"min": '675px'},
    },
  },
  plugins: [],
}