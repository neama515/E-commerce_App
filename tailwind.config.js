/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,html,ts,jsx,tsx}",
    "./index.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};

