/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
        utah: ["UtahCondensed", "sans-serif"],
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: "0% 50%" },
          '100%': { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        shine: "shine 5s linear infinite",
      },
    },
  },
  plugins: [],
}
