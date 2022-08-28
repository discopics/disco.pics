/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#13131A",
        "dark-light": "#1E1E26",
        "light-dark": "#E2E8F0",
        light: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
