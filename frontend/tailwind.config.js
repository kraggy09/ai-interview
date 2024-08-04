/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#27282C",
        "custom-gray": "#212226",
        "custom-white": "#F3F7F6",
        "custom-green": "#116752",
      },
    },
  },
  plugins: [],
};
