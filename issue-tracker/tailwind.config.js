// tailwind.config.js
var colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}"],
  important: true,
  theme: {
    colors: {
      transparent: "transparent",
      red: colors.red,
      green: colors.teal,
      drakgreen: colors.green,
      blueGray: colors.slate,
      gray: colors.neutral,
      sky: colors.sky,
      blue: colors.blue,
      yellow: colors.yellow,
      purple: colors.purple,
      white: "#fff",
      black: "#000",
      secondary: {
        900: "var(--eye-secondary-900)",
        800: "var(--eye-secondary-800)",
        700: "var(--eye-secondary-700)",
        600: "var(--eye-secondary-600)",
        500: "var(--eye-secondary-500)",
        400: "var(--eye-secondary-400)",
        300: "var(--eye-secondary-300)",
        200: "var(--eye-secondary-200)",
        100: "var(--eye-secondary-100)",
        50: "var(--eye-secondary-50)",
      },
      default: {
        900: "var(--eye-primary-900)",
        800: "var(--eye-primary-800)",
        700: "var(--eye-primary-700)",
        600: "var(--eye-primary-600)",
        500: "var(--eye-primary-500)",
        400: "var(--eye-primary-400)",
        300: "var(--eye-primary-300)",
        200: "var(--eye-primary-200)",
        100: "var(--eye-primary-100)",
        50: "var(--eye-primary-50)",
      },
    },
    fontFamily: {
      digit: ["Quantico", "sans-serif"],
    },
    extend: {
      keyframes: {
        pulse: {
          "100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
