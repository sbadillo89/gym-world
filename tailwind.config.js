const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        lime: colors.lime,
        teal: colors.teal,
        emerald: colors.emerald,
        cyan: colors.cyan,
        sky: colors.sky,
        primary: {
          100: colors.indigo[500],
          200: colors.indigo[600],
        },
        secondary: colors.indigo[300],
        tertiary: colors.indigo[100],
      },
    },
  },
  variants: {
    extend: {
      padding: ["hover"],
      borderRadius: ["hover"],
      fontSize: ["hover"],
      lineHeight: ["hover"],
    },
  },
  plugins: [],
};
